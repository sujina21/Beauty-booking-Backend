const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Routes Imports
// const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Welcome to BeautyBooking API');
    res.end();
});


// Routes
// app.use('/users', userRoutes);

module.exports = app;