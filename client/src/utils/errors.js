export class ValidationError extends Error {
    constructor(type, message) {
        super(message);
        this.type = type;
        this.name = 'ValidationError';
    }
}
