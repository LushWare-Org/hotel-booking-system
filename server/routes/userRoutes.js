const express = require('express');
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Create a new user (password will be hashed by userSchema pre-save hook)
    user = new User({
      name,
      email,
      password, // Plain text password (will be hashed in pre-save middleware)
      isAdmin: false,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});


// Login Route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          console.log('User not found with email:', email); 
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      console.log('User retrieved from DB:', user);

      const isMatch = await user.matchPassword(password);
      console.log('Password matches:', isMatch); 
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_jwt_secret', {
          expiresIn: '1h',
      });

      res.json({
          token,
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
          },
      });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error during login' });
  }
});


// Social Login with Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      // Check if user exists
      const { email, name } = req.user;
      let user = await User.findOne({ email });

      // If user doesn't exist, create a new user
      if (!user) {
        user = new User({ name, email, password: null }); // No password for social login users
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send token and user details
      res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Social login failed' });
    }
  }
);

router.get('/all', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
