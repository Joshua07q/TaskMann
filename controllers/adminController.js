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

  static async updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return APIResponse.error(res, 'Invalid role provided', 400);
    }

    const user = await User.findById(id);
    if (!user) return APIResponse.notFound(res, 'User not found');

    user.role = role;
    await user.save();

    return APIResponse.success(res, 'User role updated', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return APIResponse.notFound(res, 'User not found');

    await user.deleteOne();

    return APIResponse.success(res, 'User deleted successfully');
  }
}

module.exports = AdminController;
