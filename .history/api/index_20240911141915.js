// EXTERNAL IMPORTS
require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

// INTERNAL IMPORTS
const corsOptions = require('../config/corsOptions');
const connectDB = require('../config/dbConnect');

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;

console.log(process.env.NODE_ENV);
connectDB();

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());

// STATIC ROUTES
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('../routes/root'));

// TESING ROUTES
app.use('/test', require('../routes/test'));

// FOOD ROUTES
app.use('/foods', require('../routes/food'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
})

function generateAccessToken() {
    const payload = {
        apiKey: 'serviceApiKey123',
        permissions: 'full-access' // or 'read-only', etc.
    };

    // Generate the token without expiration
    return jwt.sign(payload, SECRET_KEY);
}

const token = generateAccessToken();
console.log(token);


module.exports = app;
