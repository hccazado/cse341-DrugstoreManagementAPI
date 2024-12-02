const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config();
mongoose.Promise = global.Promise;

const DB_URL = process.env.MONGODB_URI;
const db = {
    mongoose: mongoose,
    url: DB_URL,
    drugs: require("../models/drugs")(mongoose),
    vendors: require("../models/vendors")(mongoose),
    clients: require("../models/clients")(mongoose),
    users: require("../models/users")(mongoose),
}

module.exports = db;