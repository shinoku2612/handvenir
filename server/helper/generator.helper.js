const JWT = require('jsonwebtoken');
const type = require('./type.helper');

function generateOTP(length) {
    if (type(length) !== 'number' || length === 0) length = 6;
    const numberList = [];
    for (let i = 0; i < length; i++) {
        const digit = Math.floor(Math.random() * 10);
        numberList.push(digit);
    }
    return numberList.join('');
}

function generateAccessToken(payload) {
    return JWT.sign(payload, process.env.NODE_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.NODE_ACCESS_TOKEN_TIME,
    });
}
function generateRefreshToken(payload) {
    return JWT.sign(payload, process.env.NODE_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.NODE_REFRESH_TOKEN_TIME,
    });
}
module.exports = { generateOTP, generateAccessToken, generateRefreshToken };
