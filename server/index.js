const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

// Static variables.

const PORT = process.env.PORT;

// Import routes

const authRoute = require('./routes/auth');

// Middleware

app.use(express.json());

// Route middlewares

app.use('/api/user', authRoute);

app.post('/test', (req,res) => {
    console.log(req.body);
});

// Database

mongoose.connect(process.env.DB_STRING,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => {
    console.log('Connected to the database.');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});