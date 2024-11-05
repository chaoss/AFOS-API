import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './configs/db.config.js';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
sequelize
 .authenticate()
 .then(() => {
  console.log('Database connected successfully');
  return sequelize.sync();
 })
 .then(() => {
  console.log('Database synchronized');
 })
 .catch((error) => {
  console.error('Unable to connect to the database:', error);
 });

// Routes
app.get('/healthcheck', (req, res) => {
 res.status(200).send('AFOS server is up and running');
});

app.use(handleServerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
