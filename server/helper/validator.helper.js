class HValidator {
    static isValidEmail(email) {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(email)) return false;

        return true;
    }
    static isValidPassword(password) {
        const lowerCaseTest = /(?=.*[a-z])/.test(password);
        const upperCaseTest = /(?=.*[A-Z])/.test(password);
        const digitTest = /(?=.*\d)/.test(password);
        const specialTest = /(?=.*[#$@!%&*?])/.test(password);

        if (!lowerCaseTest) return false;
        if (!upperCaseTest) return false;
        if (!digitTest) return false;
        if (!specialTest) return false;
        if (password.length < 8) return false;
        if (password.length > 30) return false;

        return true;
    }
}

module.exports = HValidator;
