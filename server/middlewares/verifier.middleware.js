const JWT = require("jsonwebtoken");
class MVerifier {
    static async verifyToken(req, res, next) {
        const { accessToken } = req.cookies;

        if (!accessToken)
            return res.status(403).json({
                code: "TK4030", // không có token
                message: "You are not authenticated!",
            });
        JWT.verify(
            accessToken,
            process.env.NODE_ACCESS_TOKEN_SECRET,
            (error, data) => {
                if (error) {
                    switch (error.name) {
                        case "TokenExpiredError":
                            return res.status(403).json({
                                code: "TK4031", // có token nhưng hết hạn
                                message: "Token expired!",
                            });
                        case "JsonWebTokenError":
                            return res.status(403).json({
                                code: "TK4032", // có token nhưng không đúng
                                message: "Invalid token!",
                            });
                        default:
                            return res.status(403).json({
                                error,
                            });
                    }
                }
                req.user = data;
                next();
            },
        );
    }
    static async verifyAuthorization(req, res, next) {
        MVerifier.verifyToken(req, res, () => {
            if (req.user.userId === req.params.userId) {
                next();
            } else {
                return res.status(403).json({
                    code: "TK4033", // có token đúng nhưng sai user
                    message:
                        "You are not allowed to get this user information!",
                });
            }
        });
    }
}

module.exports = MVerifier;
