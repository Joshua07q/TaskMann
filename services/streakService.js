const Streak = require('../models/Streak');
const dayjs = require('dayjs');

class StreakService {
  static async updateStreak(userId) {
    let streak = await Streak.findOne({ user: userId });

    const today = dayjs().startOf('day');
    const yesterday = dayjs().subtract(1, 'day').startOf('day');

    if (!streak) {
      streak = await Streak.create({
        user: userId,
        currentStreak: 1,
        bestStreak: 1,
        lastCompletedDate: today.toDate(),
      });
    } else {
      const lastDate = dayjs(streak.lastCompletedDate).startOf('day');

      if (lastDate.isSame(today)) return; // already updated today
      if (lastDate.isSame(yesterday)) {
        streak.currentStreak += 1;
      } else {
        streak.currentStreak = 1;
      }

      if (streak.currentStreak > streak.bestStreak) {
        streak.bestStreak = streak.currentStreak;
      }

      streak.lastCompletedDate = today.toDate();
      await streak.save();
    }
  }
}

module.exports = StreakService;
// This code defines a StreakService class that manages user streaks.
// It updates the streak based on the last completed date and current date.