const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogrouter')
const userRouter = require('./controllers/userrouter')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware.js')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)
app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler)
module.exports = app;