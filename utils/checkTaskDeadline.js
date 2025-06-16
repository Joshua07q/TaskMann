const Task = require('../models/Task');
const Notification = require('../models/Notification');
const User = require('../models/User');
const dayjs = require('dayjs');

const checkTaskDeadlines = async () => {
  const now = new Date();
  const deadlineWindow = dayjs(now).add(1, 'day').toDate();

  const tasks = await Task.find({ dueDate: { $lte: deadlineWindow, $gte: now }, completed: false });

  for (const task of tasks) {
    await Notification.create({
      userId: task.userId,
      message: `Task "${task.title}" is due soon!`,
      type: 'warning',
      seen: false,
    });
  }
};

module.exports = checkTaskDeadlines;
