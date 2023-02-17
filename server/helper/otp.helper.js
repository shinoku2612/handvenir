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

module.exports = generateOTP;
