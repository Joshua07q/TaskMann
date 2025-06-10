const bcrypt = require('bcryptjs');
const User = require('../models/User');
const TokenService = require('../utils/TokenService');
const APIResponse = require('../utils/apiResponse');

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return APIResponse.badRequest(res, 'All fields are required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return APIResponse.conflict(res, 'User already exists');
    }

    const user = await User.create({ name, email, password });

    return APIResponse.created(res, 'User registered successfully', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: TokenService.generate(user._id),
      },
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return APIResponse.badRequest(res, 'Email and password required');
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return APIResponse.unauthorized(res, 'Invalid credentials');
    }

    return APIResponse.success(res, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: TokenService.generate(user._id),
      },
    });
  }
}

module.exports = new AuthController();
// This code defines an AuthController class that handles user registration and login.
// It uses bcrypt for password hashing and a TokenService for generating JWT tokens.