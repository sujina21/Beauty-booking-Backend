const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Routes Imports
const userRoute = require('./routes/userRoute');
const nailRoute = require('./routes/nailRoute');    
const makeupRoute = require('./routes/makeupRoute');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Welcome to BeautyBooking API');
    res.end();
});


// Routes
app.use('/users', userRoute);
app.use('/nail', nailRoute);
app.use('/makeup', makeupRoute);

module.exports = app;