const jwt = require('jsonwebtoken');
const User = require('../models/User');
const APIResponse = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return APIResponse.unauthorized(res, 'Unauthorized');
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    return APIResponse.unauthorized(res, 'Invalid token');
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return APIResponse.unauthorized(res, 'Admins only');
  }
  next();
};

module.exports = { protect, isAdmin };
// This code defines an authentication middleware that protects routes by verifying JWT tokens.
// It checks for the presence of a token in the Authorization header, verifies it, and attaches the user to the request object if valid.