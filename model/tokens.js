const mongoose = require('mongoose');

const tokensSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  type: { type: String, enum: ['access', 'refresh'], required: true },
  expires: { type: Date, required: true },
  createdByIp: { type: String, default: '' },
  device: { type: String, default: '' }
}, { timestamps: true });

const tokensModel = mongoose.model('Tokens', tokensSchema);
module.exports = tokensModel;
