const ApiError = require('../utils/ApiError');

const validateReq = (schema) => (req, res, next) => {
    console.log('validateReq: next is function?', typeof next === 'function');
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        // Zod throws an error with an array of issues
        const errorMessage = error.issues?.map((issue) => issue.message).join(', ') || error.message;
        next(new ApiError(errorMessage, 400));
    }
};

module.exports = validateReq;