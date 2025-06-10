const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
  type: String,
  enum: ['low', 'medium', 'high'],
  default: 'medium',
},
  tags: [{
    type: String,
  }],
  remindAt: {
  type: Date,
}
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
// This code defines a Mongoose schema for a Task model.
// The schema includes fields for user reference, title, description, due date, completion status, and timestamps.