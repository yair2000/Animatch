const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500; // If the error code doesn't exist, code 500 will be printed by default

    if(process.env.NODE_ENV === "DEVELOPMENT"){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        });
    }
    if(process.env.NODE_ENV === "PRODUCTION"){
        let error = {...err}
        error.message = err.message

        if(err.name === 'JsonWebTokenError'){
            const message = 'JSON Web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }
        if(err.name === 'TokenExpiredError'){
            const message = 'JSON Web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}