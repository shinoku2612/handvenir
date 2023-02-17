// import libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// import routers / middlewares
const authRoute = require('./routes/auth.route.js');

// configurations
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const MongoDBConnect = require('./databases/mongo.connect.js');
MongoDBConnect(process.env.NODE_MONGO_URI);

// use middlewares - routers
app.use('/api/auth', authRoute);

// app listening
const runningPort = process.env.NODE_PORT || 3032;
app.listen(runningPort, () => {
    console.log(
        `Server is running on ${process.env.NODE_DOMAIN}:${runningPort}`,
    );
});
