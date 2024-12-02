const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clientSchema = new schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String},
    ssid: {type: String},
    purchases: [
        {
            drugId : [{type: schema.Types.ObjectId, ref: "Drug"}],
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);