class OTPResponse {
    static sendOTPFailure(message) {
        return {
            code: '000040',
            status: 'error',
            data: message,
        };
    }
}

class UserResponse {}

module.exports = {
    OTPResponse,
    UserResponse,
};
