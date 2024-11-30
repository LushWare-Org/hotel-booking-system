const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String, // E.g., 'google', 'facebook', or 'local'
      default: 'local',
    },
    providerId: {
      type: String, // Social provider's unique user ID (e.g., Google ID or Facebook ID)
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  console.log('Plain password before hashing:', this.password); // Debugging the plain password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('Hashed password:', this.password); // Debugging the hashed password
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('Entered password:', enteredPassword); // Debugging entered password
  console.log('Stored hashed password:', this.password); // Debugging stored password
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;
