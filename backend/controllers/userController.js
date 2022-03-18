const asyncHandler = require('express-async-handler');

exports.registerUser = asyncHandler((req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  res.json({
    message: 'User registered successfully',
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
