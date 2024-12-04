const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const db = require('./db');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-document.json');

dotEnv.config();

app.use(bodyParser.json());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Origin, X-requested-With, Z-Key'
    ),
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'),
    next();
});

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('Cannot connect to MongoDB ' + error);
  });

app.use('/', require('./routes'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.listen(PORT, () => {
  console.log('API listening on PORT: ' + PORT);
});
