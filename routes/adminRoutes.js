/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only routes
 */

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get app-wide statistics (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin stats fetched
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

// routes/adminRoutes.js
const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const AdminController = require('../controllers/adminController');
const User = require('../models/User');
const APIResponse = require('../utils/apiResponse');
const router = express.Router();

router.use(protect, isAdmin);

router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  return APIResponse.success(res, 'All users', users);
});

router.get('/stats', AdminController.getStats);

// 🔥 New admin controls
router.patch('/users/:id/role', AdminController.updateUserRole);
router.delete('/users/:id', AdminController.deleteUser);

module.exports = router;
// This code defines the admin routes for managing users and fetching statistics.
// It uses the `protect` and `isAdmin` middleware to ensure that only authenticated admins can access these routes.
