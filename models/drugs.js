const mongoose = require("mongoose");
const schema = mongoose.Schema;

const drugSchema = new schema({
    commercialName: {type: String, required: true},
    scientificName: {type: String, required: true},
    VendorId:{type: schema.Types.ObjectId, ref: "Vendor"},
    expireDate: {type: String, required: true},
    doses: {type: String, required: true},
    description: {type: String}
},
{
    timestamps: true
});

module.exports = mongoose.model("Drug", drugSchema);