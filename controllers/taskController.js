const Task = require("../models/Task");
const APIResponse = require("../utils/apiResponse");
const StreakService = require("../services/streakService");

class TaskController {
  async create(req, res) {
    const { title, description, dueDate, priority, remindAt } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      dueDate,
      priority,
      remindAt,
    });
    return APIResponse.created(res, "Task created", task);
  }

  async getAll(req, res) {
    const { priority } = req.query;
    const filter = { user: req.user._id };
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    return APIResponse.success(res, "Tasks retrieved", tasks);
  }

  async update(req, res) {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!task) return APIResponse.badRequest(res, "Task not found");

    if (req.body.completed === true) {
      await StreakService.updateStreak(req.user._id);
    }

    return APIResponse.success(res, "Task updated", task);
  }
  
  async getOne(req, res) {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return APIResponse.badRequest(res, "Task not found");
    return APIResponse.success(res, "Task retrieved", task);
  }

  async delete(req, res) {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return APIResponse.badRequest(res, "Task not found");
    return APIResponse.success(res, "Task deleted");
  }

async getAnalytics(req, res) {
  const userId = req.user._id;

  const [completed, missed, total, priorities] = await Promise.all([
    Task.countDocuments({ user: userId, completed: true }),
    Task.countDocuments({ user: userId, completed: false, dueDate: { $lt: new Date() } }),
    Task.countDocuments({ user: userId }),
    Task.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]),
  ]);

  return APIResponse.success(res, 'Analytics retrieved', {
    completed,
    missed,
    total,
    priorityDistribution: priorities.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {}),
  });
}
}

module.exports = new TaskController();
