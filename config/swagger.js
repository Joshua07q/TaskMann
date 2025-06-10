// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🧠 Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Task Manager backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // location of route + model comments
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
// This code sets up Swagger for API documentation in a Node.js application.
// It uses `swagger-jsdoc` to generate the documentation from JSDoc comments in the routes and models.