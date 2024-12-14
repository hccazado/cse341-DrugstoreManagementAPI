const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clientSchema = new schema({
    client_name: {type: String, required: true},
    client_phone: {type: String, required: true},
    client_address: {type: String},
    client_ssid: {type: String, unique: true, immutable: true},
    client_purchases: [{
        purchase_date: {type: String, required: true},
        drug_id: {type: schema.Types.ObjectId, ref: "Drug"}, 
        quantity: {type: String, required: true},
    }]
},
{
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);