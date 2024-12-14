const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    provider: { type: String },
    providerId: { type: String },
    username: { type: String },
    accessLevel: ['customer', 'admin', 'store'],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
