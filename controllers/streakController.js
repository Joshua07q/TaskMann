const Streak = require('../models/Streak');
const StreakService = require('../services/streakService');
const APIResponse = require('../utils/apiResponse');

class StreakController {
  constructor(streakService) {
    this.streakService = streakService;
  }

  // ✅ GET /api/streak/me
  async getUserStreak(req, res) {
    try {
      const userId = req.user._id;
      const streak = await Streak.findOne({ user: userId });

      if (!streak) {
        return APIResponse.success(res, 'No streak yet', {
          currentStreak: 0,
          bestStreak: 0,
        });
      }

      return APIResponse.success(res, 'Streak fetched', {
        currentStreak: streak.currentStreak,
        bestStreak: streak.bestStreak,
      });
    } catch (err) {
      return APIResponse.serverError(res, 'Failed to fetch streak', err.message);
    }
  }

  // ✅ (Optional) Manual update endpoint if needed
  async updateStreak(req, res) {
    try {
      const userId = req.user._id;
      if (!userId) {
        return APIResponse.badRequest(res, 'User ID is required');
      }
      const updated = await this.streakService.updateStreak(userId);
      return APIResponse.success(res, 'Streak updated', updated);
    } catch (error) {
      return APIResponse.serverError(res, 'Failed to update streak', error.message);
    }
  }
}

module.exports = new StreakController(StreakService);
