import { ValidationError } from './errors';

export function getBrowserWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
    );
}

export function getBrowserHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
    );
}

export function checkType(data) {
    const type = Object.prototype.toString.call(data).slice(8, -1);
    return type.toLowerCase();
}
export function hideEmail(email) {
    return email.replace(/(\w{2})[\w.-]+@[\w]+[\w]/, '$1***@****');
}
export function validateInput(input) {
    if (input.value === '')
        return new ValidationError(input.name, 'This field is required');
    switch (input.name) {
        case 'email': {
            const pattern =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!pattern.test(input.value))
                return new ValidationError(input.name, 'Invalid email format!');
            break;
        }
        case 'password': {
            const lowerCaseTest = /(?=.*[a-z])/.test(input.value);
            const upperCaseTest = /(?=.*[A-Z])/.test(input.value);
            const digitTest = /(?=.*\d)/.test(input.value);
            const specialTest = /(?=.*[#$@!%&*?])/.test(input.value);

            if (!lowerCaseTest) {
                return new ValidationError(
                    input.name,
                    'Password must contain at least 1 lower case character',
                );
            }
            if (!upperCaseTest) {
                return new ValidationError(
                    input.name,
                    'Password must contain at least 1 upper case character',
                );
            }
            if (!digitTest) {
                return new ValidationError(
                    input.name,
                    'Password must contain at least 1 digit',
                );
            }
            if (!specialTest) {
                return new ValidationError(
                    input.name,
                    'Password must contain at least 1 special character',
                );
            }
            if (input.value.length < 8) {
                return new ValidationError(
                    input.name,
                    'Password must contain at least 8 characters',
                );
            }
            if (input.value.length > 30) {
                return new ValidationError(
                    input.name,
                    'Password must contain at most 30 characters',
                );
            }
            break;
        }
        default:
            return null;
    }
    return null;
}
