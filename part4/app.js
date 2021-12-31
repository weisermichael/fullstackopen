const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogrouter')
const userRouter = require('./controllers/userrouter')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
module.exports = app;