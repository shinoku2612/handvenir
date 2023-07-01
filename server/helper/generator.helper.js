const JWT = require("jsonwebtoken");
const type = require("./type.helper");

class HGenerator {
    static generateOTP(length) {
        if (type(length) !== "number" || length === 0) length = 6;
        const numberList = [];
        for (let i = 0; i < length; i++) {
            const digit = Math.floor(Math.random() * 10);
            numberList.push(digit);
        }
        return numberList.join("");
    }

    static generateToken(payload, secret, expiresIn) {
        return JWT.sign(payload, secret, {
            expiresIn: expiresIn,
        });
    }
    static generateAccessToken(payload, expiresIn) {
        return JWT.sign(payload, process.env.NODE_ACCESS_TOKEN_SECRET, {
            expiresIn: expiresIn,
        });
    }
    static generateRefreshToken(payload, expiresIn) {
        return JWT.sign(payload, process.env.NODE_REFRESH_TOKEN_SECRET, {
            expiresIn: expiresIn,
        });
    }
}
module.exports = HGenerator;
