exports.registerUser = (req, res) => {
  res.json({
    message: 'User Registration',
  });
};

exports.loginUser = (req, res) => {
  res.json({
    message: 'User Login',
  });
};

exports.currentUser = (req, res) => {
  res.json({
    message: 'User Current',
  });
};
