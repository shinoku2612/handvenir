class Config {
    static cookie = {
        options: {
            path: "/",
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production" ? true : false,
            secure: true,
            sameSite: "none",
        },
    };
}
module.exports = Config;
