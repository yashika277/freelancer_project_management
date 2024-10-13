const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema definition for user accounts
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's full name
  email: { type: String, unique: true, required: true }, // Unique email address for the user
  password: { type: String, required: true }, // Encrypted user password
});

// Middleware to hash password before saving a user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with salt rounds
  next();
});

// Method to compare input password with stored password
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare passwords
};

// Export the User model based on the user schema
module.exports = mongoose.model('User', userSchema);
