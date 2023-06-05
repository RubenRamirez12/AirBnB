const { validationResult } = require("express-validator");

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => {
                errors[error.path] = error.msg
            });
        //changed from error.params => error.path as it didnt seem to exist prior.
        const err = Error("bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
}

module.exports = { handleValidationErrors}
