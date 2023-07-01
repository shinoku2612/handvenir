const JWT = require('jsonwebtoken');
class MVerifier {
    static async verifyAuthorization(req, res, next) {
        const authHeader = req.headers['Authorization'];

        if (!authHeader)
            return res.status(403).json('You are not authenticated!');

        const accessToken = authHeader.split(' ')[1];
        JWT.verify(
            accessToken,
            process.env.NODE_ACCESS_TOKEN_SECRET,
            (error, data) => {
                if (error)
                    return res.status(403).json('You are not authorized!');
                req.user = data;
                next();
            },
        );
    }
}

module.exports = MVerifier;
