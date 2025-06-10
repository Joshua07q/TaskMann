const User = require('../models/User');
const Task = require('../models/Task');
const APIResponse = require('../utils/apiResponse');

class AdminController {
  static async getStats(req, res) {
    const [users, tasks] = await Promise.all([
      User.countDocuments(),
      Task.countDocuments(),
    ]);
    return APIResponse.success(res, 'Admin stats fetched', { users, tasks });
  }
}


module.exports = AdminController;
// This code defines an AdminController class that provides a method to fetch statistics for the admin dashboard.
// It retrieves the count of users and tasks from the database and returns them in a structured API response.   