const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user (password will be hashed in the model's pre-save middleware)
  const newUser = new User({ username, email, password });
  await newUser.save();

  // Generate a token
  const token = jwt.sign({ id: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

  // Respond with the token and success message
  res.status(201).json({ message: 'User registered successfully', token });
});



// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Find the user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid username' });
  }
  else{
    console.log("User is:", user)
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Hashed password:', user.password);
  console.log('Provided password:', password);
  console.log('Does the password match?', isPasswordValid);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate a token
  const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Protected route example
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;
