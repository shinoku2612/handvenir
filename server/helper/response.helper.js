class OTPResponse {
    static #STATUS_FAILED = 'otp-failed';
    static #STATUS_SUCCESS = 'otp-success';
    static MultipleCallError() {
        return {
            code: '400001',
            status: this.#STATUS_FAILED,
            data: 'There are other requests to get OTP from other places at the same time',
        };
    }
    static TypeError(type) {
        return {
            code: '400002',
            status: this.#STATUS_FAILED,
            data: `Unexpected request type:: type=${type}`,
        };
    }
    static InvalidCodeError() {
        return {
            code: '401003',
            status: this.#STATUS_FAILED,
            data: 'Invalid OTP code',
        };
    }
    static CodeNotFoundError() {
        return {
            code: '404004',
            status: this.#STATUS_FAILED,
            data: 'Invalid OTP code',
        };
    }
    static SuccessfullySent() {
        return {
            code: '201005',
            status: this.#STATUS_SUCCESS,
            data: 'Please check your email to receive OTP code',
        };
    }
}

class AuthResponse {
    static #STATUS_FAILED = 'authentication-failed';
    static #STATUS_SUCCESS = 'authentication-success';
    // [REGISTER]
    static DuplicatedError(identifier) {
        if (identifier === 'email')
            return {
                code: '409101',
                status: this.#STATUS_FAILED,
                data: 'Email has already been in used!',
            };
        return {
            code: '409101',
            status: this.#STATUS_FAILED,
            data: `Duplicated identifier:: identifier=${identifier}`,
        };
    }
    static SuccessfullyRegistered() {
        return {
            code: '201102',
            status: this.#STATUS_SUCCESS,
            data: 'Successfully registered',
        };
    }
    // [LOGIN]
    static UnregisteredError() {
        return {
            code: '404111',
            status: this.#STATUS_FAILED,
            data: "Maybe you haven't joined us yet. Please make a new account and get back",
        };
    }
    static CredentialsError() {
        return {
            code: '401112',
            status: this.#STATUS_FAILED,
            data: 'Wrong credentials',
        };
    }
    static SuccessfullyLoggedIn(responseData) {
        return {
            code: '200113',
            status: this.#STATUS_SUCCESS,
            data: responseData,
        };
    }
    // [LOGOUT]
    static SuccessfullyLoggedOut() {
        return {
            code: '200121',
            status: this.#STATUS_SUCCESS,
            data: 'Successfully logged out',
        };
    }
}

module.exports = {
    OTPResponse,
    AuthResponse,
};
