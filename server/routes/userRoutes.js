const express = require('express');
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password, contact_number } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Create a new user (password will be hashed by userSchema pre-save hook)
    user = new User({
      name,
      email,
      password, 
      contact_number,
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
              contact_number: user.contact_number,
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

router.put( '/:id', async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;
  try {
    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) {
      user.name = name || user.name;
    }

    if (password) {
      user.password = password || user.password;
    }

    await user.save();
    res.json({ message: 'User updated successfully', user: { id: user.id, name: user.name } }); 
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
});

router.patch('/:id/admin', async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isAdmin },
      { new: true, runValidators: false }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Admin status updated successfully', user: { id: user.id, isAdmin: user.isAdmin } });
  } catch (error) {
    console.error('Error updating admin status:', error);
    res.status(500).json({ message: 'Error updating admin status', error });
  }
});

module.exports = router;
