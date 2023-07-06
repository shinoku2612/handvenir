// import libraries
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// configurations
dotenv.config();
const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://shin-pay.vercel.app"],
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json());

// MongoDB connection
require("./databases/mongo.connect.js");

// import routers / middlewares
const authRoute = require("./routes/auth.route.js");
const cartRoute = require("./routes/cart.route.js");
const commentRoute = require("./routes/comment.route.js");
const otpRoute = require("./routes/otp.route.js");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");

// use middlewares - routers
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
// app.use('/api/otp', otpRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);

// app listening
const runningPort = process.env.NODE_PORT || 3032;
app.listen(runningPort, () => {
    console.log(
        `Server is running on ${process.env.NODE_DOMAIN}:${runningPort}`,
    );
});
