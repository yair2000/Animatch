class ErrorHandler extends Error{
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode

    // Catch the entire error message
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ErrorHandler;