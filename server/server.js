// import libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// configurations
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
require('./databases/mongo.connect.js');

// import routers / middlewares
const authRoute = require('./routes/auth.route.js');
const otpRoute = require('./routes/otp.route.js');

// use middlewares - routers
app.use('/api/auth', authRoute);
app.use('/api/otp', otpRoute);

// app listening
const runningPort = process.env.NODE_PORT || 3032;
app.listen(runningPort, () => {
    console.log(
        `Server is running on ${process.env.NODE_DOMAIN}:${runningPort}`,
    );
});