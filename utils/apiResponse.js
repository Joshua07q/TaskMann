class APIResponse {
  static success(res, message, data = {}) {
    return res.status(200).json({ status: 'success', message, data });
  }

  static created(res, message, data = {}) {
    return res.status(201).json({ status: 'success', message, data });
  }

  static badRequest(res, message) {
    return res.status(400).json({ status: 'error', message });
  }

  static unauthorized(res, message) {
    return res.status(401).json({ status: 'error', message });
  }

  static conflict(res, message) {
    return res.status(409).json({ status: 'error', message });
  }

  static serverError(res, error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = APIResponse;
// This code defines an APIResponse utility class that provides methods for sending standardized JSON responses.
// Each method corresponds to a different HTTP status code and includes a message and optional data.