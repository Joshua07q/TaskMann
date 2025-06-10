const jwt = require('jsonwebtoken');

class TokenService {
  static generate(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = TokenService;
// This code defines a TokenService class that provides methods for generating and verifying JWT tokens.
// It uses the jsonwebtoken library to handle token operations.