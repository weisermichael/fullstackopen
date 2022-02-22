const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, pass} = request.body

    const user = await User.findOne( {userName: username} )
    const passCorrect = user === null 
        ? false
        : await bcrypt.compare(pass, user.passwordHash)

    if (!(passCorrect && user)) {
        return response.status(401).json({
            error: "invalid username or pass"
        })
    }

    const tokenUser = {
        user: user.userName,
        id: user._id
    }

    const token = jwt.sign(tokenUser, process.env.SECRET)

    response.status(200).send({token, username:user.userName, name:user.name})
})

module.exports = loginRouter