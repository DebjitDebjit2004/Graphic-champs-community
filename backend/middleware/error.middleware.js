// Handle 404 - Not Found
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
    // Set status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Log the error in development
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Send error response
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

// Handle MongoDB CastError
export const handleCastError = (err, res) => {
    const message = `Resource not found. Invalid: ${err.path}`;
    return res.status(400).json({
        success: false,
        message,
    });
};

// Handle 11000 MongoDB duplicate key errors
export const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const message = `Duplicate field value: ${field}. Please use another value!`;
    return res.status(400).json({
        success: false,
        message,
    });
};

// Handle validation errors
export const handleValidationError = (err, res) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return res.status(400).json({
        success: false,
        message,
    });
};

// Handle JWT errors
export const handleJWTError = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again!',
    });
};

export const handleJWTExpiredError = (res) => {
    return res.status(401).json({
        success: false,
        message: 'Your token has expired! Please log in again.',
    });
};

// Export all error handlers
export default {
    notFound,
    errorHandler,
    handleCastError,
    handleDuplicateKeyError,
    handleValidationError,
    handleJWTError,
    handleJWTExpiredError,
};
