const mongoose = require('mongoose');

const streakSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  currentStreak: { type: Number, default: 0 },
  lastCompletedDate: { type: Date, default: null },
  bestStreak: { type: Number, default: 0 },
});

module.exports = mongoose.model('Streak', streakSchema);
