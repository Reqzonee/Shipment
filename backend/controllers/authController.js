// controllers/authController.js

const user = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};


const signup = async (req, res) => {
    try {
      const { firstName, lastName, accountType} = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ firstName });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create new user
      const user = await User.create({ firstName, lastName, accountType});
      const token = createToken(user._id);
      user.token = token;
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Signup error:', error.message);
      res.status(500).json({ error: 'Server error during signup' });
    }
  };
    
// Login function
const login = async (req, res) => {
    try {
      const { firstName, lastName, accountType } = req.body;
  
      // Find user
      const user = await User.findOne({ firstName:firstName, lastName:lastName, accountType:accountType });
      if (!user) {
        return res.status(401).json({ error: 'Invalid request' });
      }
  
      // Generate token
      const token = createToken(user._id);
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Server error during login' });
    }
  };

  const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  
  
module.exports = { signup, login, logout};
