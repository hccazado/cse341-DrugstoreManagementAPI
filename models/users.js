const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    clientId: {type: mongoose.Types.ObjectId, ref: "Client"},
    email: {type: String},
    provider: {type: String},
    providerId: {type: String},
    userName: {type: String},
    accessLevel: ["customer", "admin", "store"],
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);