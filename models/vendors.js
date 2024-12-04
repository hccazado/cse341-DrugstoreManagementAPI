const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vendorSchema = new schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String},
    rating: {type: Number},
    itin: {type: String}
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Vendor", vendorSchema);