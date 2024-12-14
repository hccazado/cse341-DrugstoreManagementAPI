const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const db = require('./db');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-document.json');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const userController = require('./controllers/users');

dotEnv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: '06a0ff20199c0a2f73498154d37db2f9bb94fcadc9cf632d1db46f60caf54d5a',
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({ db: 'sessions.db', dir: './' }),
    cookie: process.env.NODE_ENV == 'DEVELOPMENT' ? {} : { secure: true },
  })
);

app.use(passport.initialize());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      const userData = await userController.findOrCreate(profile);
      return done(null, userData);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Origin, X-requested-With, Z-Key'
    ),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'),
    next();
});

app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || 'Something went wrong';
  res.status(errStatus).json({
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV == 'development' ? err.stack : {},
  });
});

process.on('uncaughtException', (error, origin) => {
  console.log(`caught exception: ${error}\nException origin: ${origin}`);
});

const PORT = process.env.PORT || 8080;

function connectDB() {
  db.mongoose
    .connect(db.url)
    .then(() => {
      app.listen(PORT, () => {
        console.log('API listening on PORT: ' + PORT);
      });
      console.log('MongoDB connected');
    })
    .catch((error) => {
      console.log('Cannot connect to MongoDB. Stopping server.' + error);
      process.exit(1);
    });
}

connectDB();

module.exports = app;
