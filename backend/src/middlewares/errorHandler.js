const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    error.statusCode = err.statusCode || 500;
    error.status = err.status || 'error';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        error = new ApiError(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = new ApiError(message, 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = new ApiError(message, 400);
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new ApiError('Invalid token, please login again', 401);
    }
    if (err.name === 'TokenExpiredError') {
        error = new ApiError('Token expired, please login again', 401);
    }

    if (process.env.NODE_ENV === 'development') {
        res.status(error.statusCode).json({
            status: error.status,
            error: err,
            message: error.message,
            stack: err.stack,
        });
    } else {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
};

module.exports = errorHandler;