const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(500);
    throw new Error('Error creating user');
  }

  res.json({
    message: 'User registered successfully',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.loginUser = asyncHandler((req, res) => {
  res.json({
    message: 'User logged in successfully',
  });
});

exports.currentUser = asyncHandler((req, res) => {
  res.json({
    message: 'Current user retrieved successfully',
  });
});
