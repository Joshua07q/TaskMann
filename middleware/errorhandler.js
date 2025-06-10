const APIResponse = require('../utils/apiResponse');

module.exports = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return APIResponse.badRequest(res, err.message);
  }

  if (err.code === 11000) {
    return APIResponse.badRequest(res, 'Duplicate value error');
  }

  return APIResponse.error(res, 'Internal Server Error', 500);
};
// This code defines an error handling middleware for Express.js applications.
// It catches errors, logs them, and sends a standardized error response based on the type of error.