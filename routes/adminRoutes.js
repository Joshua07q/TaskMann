const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const AdminController = require('../controllers/adminController');
const User = require('../models/User');
const APIResponse = require('../utils/apiResponse');
const router = express.Router();

router.use(protect, isAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only routes
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
 */

/**
 * @swagger
 * /admin/stats:
 *   get:
 *     summary: Get system stats (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: App-wide statistics (user/task count)
 */

router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  return APIResponse.success(res, 'All users', users);
});

router.get('/stats', AdminController.getStats); 
module.exports = router;

// This code defines admin routes for managing users and fetching statistics.
// It uses middleware to protect the routes and ensure only admins can access them.