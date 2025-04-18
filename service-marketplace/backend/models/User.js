const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'provider', 'customer'],
    required: true
  }
}, {
  timestamps: true
});

// Hash password before saving using bcryptjs
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Use bcrypt to hash password
  next();
});

module.exports = mongoose.model('User', userSchema);
