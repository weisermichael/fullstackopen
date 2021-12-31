const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require("../models/user.js")

userRouter.post('/', async (req, res) => {
    const body = req.body

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