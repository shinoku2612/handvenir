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
    // [REFRESH-TOKEN]
    static Unauthorized() {
        return {
            code: '401131',
            status: this.#STATUS_FAILED,
            data: 'Unauthorized',
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

class TokenResponse {
    static #STATUS_FAILED = 'token-failed';
    static #STATUS_SUCCESS = 'token-success';

    static TokenNotFound() {
        return {
            code: '404301',
            status: this.#STATUS_FAILED,
            data: 'Invalid token',
        };
    }
    static InvalidTokenError() {
        return {
            code: '400302',
            status: this.#STATUS_FAILED,
            data: 'Invalid token',
        };
    }
    static SuccessfullyRefresh(responseData) {
        return {
            code: '200303',
            status: this.#STATUS_SUCCESS,
            data: responseData,
        };
    }
    static VerifyError(error) {
        return {
            code: '401304',
            status: this.#STATUS_FAILED,
            data: error,
        };
    }
}

class UserResponse {
    static #STATUS_FAILED = 'information-failed';
    static #STATUS_SUCCESS = 'information-success';

    static SuccessfullyGetUser(user) {
        return {
            code: '200201',
            status: this.#STATUS_SUCCESS,
            data: user,
        };
    }
    static SuccessfullyUpdateUser(user) {
        return {
            code: '200203',
            status: this.#STATUS_SUCCESS,
            data: user,
        };
    }
    static NotAllowed() {
        return {
            code: '403202',
            status: this.#STATUS_FAILED,
            data: 'You cannot get this user information',
        };
    }
}

class ServerResponse {
    static InternalError(error) {
        return {
            code: '500',
            status: 'server-error',
            data: error,
        };
    }
}

module.exports = {
    OTPResponse,
    AuthResponse,
    ServerResponse,
    UserResponse,
    TokenResponse,
};
