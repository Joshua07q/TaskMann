const APIResponse = require('../utils/apiResponse');

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return APIResponse.unauthorized(res, 'Access denied');
    }
    next();
  };
}

module.exports = requireRole;
// This code defines a middleware function that checks if the user has the required role.
// If the user does not have the required role, it sends an unauthorized response.