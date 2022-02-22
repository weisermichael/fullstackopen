const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require("../models/user.js")

userRouter.post('/', async (req, res) => {
    const body = req.body

    // username and pass must be provided
    if (!(body.userName && body.password)){
        return res.status(400).json({
            error: "username or password not provided"
        })
    }
    //username and pass must be at least 3 chars 
    if (!(body.userName.length >= 3 && body.password.length >= 3)){
        return res.status(400).json({
            error: "username and pass must be minimum 3 characters long"
        })
    }

    const passwordHash = await bcrypt.hash(body.password, 10)
    
    const newUser = new User({
        name: body.name,
        userName: body.userName,
        passwordHash
    })
    const savedUser = await newUser.save()
    res.json(savedUser)
})

userRouter.get("/", async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

module.exports = userRouter