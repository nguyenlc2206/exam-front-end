/** Define app error reponse */
class AppError extends Error {
    status: string;

    constructor(message: string, status: string) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
