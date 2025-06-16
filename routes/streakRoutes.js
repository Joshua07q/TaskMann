const router = require('express').Router();
const StreakController = require('../controllers/streakController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/me', StreakController.getUserStreak);
router.post('/me', StreakController.updateStreak);

module.exports = router;
// This code defines the streak routes for getting and updating user streaks.
// It uses the StreakController to handle the logic for these operations.