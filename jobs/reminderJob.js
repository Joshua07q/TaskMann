// jobs/reminderJob.js
const cron = require('node-cron');
const Task = require('../models/Task');
const sendReminderEmail = require('../utils/sendReminderEmail');

function reminderJob() {
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const tasks = await Task.find({
      remindAt: { $lte: now },
      reminded: false
    });

    for (const task of tasks) {
      await sendReminderEmail(task.userEmail, task.title, task.remindAt);
      task.reminded = true;
      await task.save();
    }

    console.log(`🔔 Processed ${tasks.length} reminder(s) at ${now.toISOString()}`);
  });
}

module.exports = reminderJob;
// This job runs every minute to check for tasks that need reminders.
// It sends reminder emails for tasks that have a `remindAt` date in the past and marks them as reminded.
// The job uses the `node-cron` library to schedule the task and the `sendReminderEmail` utility to send emails.
// Ensure you have the necessary environment variables set for email credentials.