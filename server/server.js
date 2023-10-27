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
        origin: ["http://localhost:3000", "https://handvenir.vercel.app"],
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
const categoryRoute = require("./routes/category.route.js");
const orderRoute = require("./routes/order.route.js");
const otpRoute = require("./routes/otp.route.js");
const productRoute = require("./routes/product.route.js");
const reviewRoute = require("./routes/review.route.js");
const userRoute = require("./routes/user.route.js");
const wishListRoute = require("./routes/wish-list.route.js");
const locationRoute = require("./routes/location.route.js");

// use middlewares - routers
app.get("/api", (req, res) => {
    return res.status(200).json({ status: "success", ready: true });
});
app.use("/api/auth", authRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);
// app.use('/api/otp', otpRoute);
app.use("/api/product", productRoute);
app.use("/api/review", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/wish-list", wishListRoute);
app.use("/api/location", locationRoute);

// app listening
const runningPort = process.env.NODE_PORT || 3032;
app.listen(runningPort, () => {
    console.log(
        `Server is running on ${process.env.NODE_DOMAIN}:${runningPort}`,
    );
});
