const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User.js')
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashed });
  await newUser.save();
  res.status(201).json("User registered");
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json("User not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json("Wrong credentials");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true }).json(user);
});

router.get('/logout', (req, res) => {
  res.clearCookie('token').json("Logged out");
});

// server/routes/auth.js (add this at the end)
router.get('/me',verifyToken, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  res.json(req.user);
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:5173',
  failureRedirect: '/login/failed'
}));

module.exports = router;