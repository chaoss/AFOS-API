import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './configs/db.config.js';
import logger from './configs/logger.config.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

// Database initialization
sequelize
 .authenticate()
 .then(() => {
  logger.info('Database connected successfully');
  return sequelize.sync();
 })
 .then(() => {
  logger.info('Database synchronized');
 })
 .catch((error) => {
  logger.error('Unable to connect to the database:', error);
 });

// Routes
app.get('/healthcheck', (req, res) => {
 res.status(200).send('AFOS server is up and running');
});

// Error handling middleware
app.use(handleServerError);

export default app;
