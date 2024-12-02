const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    clientId: {type: mongoose.Types.ObjectId, ref: "Client"},
    email: {type: String},
    username: {type: String},
    accessLevel: ["customer", "admin", "store"],
    status: ["active", "inactive"]
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);