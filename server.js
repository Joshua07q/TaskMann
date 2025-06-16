require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes'); // User authentication routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes
const streakRoutes = require('./routes/streakRoutes'); // Streak management routes
// Task management routes
const taskRoutes = require('./routes/taskRoutes');
const reminderJob = require('./jobs/reminderJob'); // ⏰ CRON JOB
const errorHandler = require('./middleware/errorhandler');
const { swaggerUi, specs } = require('./config/swagger'); // Swagger setup

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.handleErrors();
    this.startReminderJob(); // ⏰ Start cron
  }

  connectDatabase() {
    connectDB(); // handles DB connection using Mongoose
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(helmet());
  }

  



initializeRoutes() {
  this.app.get('/', (req, res) => {
    res.send('🚀 Task Manager API is running');
  });

  this.app.get('/api', (req, res) => {
    res.send('🌐 Welcome to the Task Manager API');
  });

  // ✅ Swagger Docs
  this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

  // Existing routes
  this.app.use('/api/auth', userRoutes);
  this.app.use('/api/admin', adminRoutes);
  this.app.use('/api/tasks', taskRoutes);
  this.app.use('/api/streak', streakRoutes);
}

  handleErrors() {
    this.app.use(errorHandler); // Centralized error handler
  }

  startReminderJob() {
    reminderJob(); // This starts the cron job when the server boots
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`✅ Server running on http://localhost:${this.port}`);
    });
  }
}

// 🔥 Boot up the app
new Server().listen();
// This code initializes an Express server, connects to MongoDB, sets up middlewares, routes, and starts a cron job for reminders.
// It also includes error handling middleware to manage errors centrally.
// The server listens on a specified port and logs the status to the console.
// Ensure you have the necessary environment variables set for MongoDB connection and other configurations.
// Make sure to install the required packages: express, mongoose, morgan, cors, helmet, dotenv, node-cron
// You can run this server using `node server.js` or `nodemon server.js` if you have nodemon installed for development.