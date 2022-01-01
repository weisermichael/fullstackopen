const logger = require('./logger.js')

const invalidEndpoint = () => {

}


const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
    }
    next(error)
}

module.exports = {
    errorHandler,
    invalidEndpoint
}