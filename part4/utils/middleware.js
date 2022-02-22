const jwt = require("jsonwebtoken")
const User = require('../models/user')

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

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
      req.token =  authorization.substring(7)
    }
    else {
        req.token = null
    }
    next()
}
const userExtractor = async (req, res, next) => {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(decodedToken.id)

    next()
}

module.exports = {
    errorHandler,
    invalidEndpoint,
    tokenExtractor,
    userExtractor
}