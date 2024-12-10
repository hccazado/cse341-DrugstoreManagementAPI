const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema(
  {
    commercialName: { type: String, required: true },
    scientificName: { type: String, required: true },
    VendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
    expireDate: { type: String, required: true },
    doses: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Drug', drugSchema);
