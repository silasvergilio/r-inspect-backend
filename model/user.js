const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['inspector', 'inspector_coordinator'], required: true }
});

// Pre-save hook to hash password before saving a user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// Method to check password validity
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;
