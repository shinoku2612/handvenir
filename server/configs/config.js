class Config {
    static cookie = {
        options: {
            path: '/',
            httpOnly: true,
            // secure: true ? process.env.NODE_ENV === 'production' : false,
            secure: true,
            sameSite: 'none',
        },
    };
}
module.exports = Config;
