const mongoose = require("mongoose");
const schema = mongoose.Schema;

const storeSchema = new schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
    drugId : {type: schema.Types.ObjectId, ref: "Drug"},
    quantity: {type: String, required: true}
},
{
    timestamps: true
});

module.exports = mongoose.model("Store", storeSchema);