import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/healthcheck', req, res => {
 res.status(200).send('AFOS server is up and running');
});

app.use(handleServerError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
