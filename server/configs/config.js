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
    static googledrive = {
        clientId: process.env.NODE_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NODE_GOOGLE_CLIENT_SECRET,
        redirectUri: "https://developers.google.com/oauthplayground",
        refreshToken: process.env.NODE_GOOGLE_REFRESH_TOKEN,
    };
}
module.exports = Config;
