const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
//const Blog = require('./models/blog.js')
const blogRouter = require('./controllers/blogrouter')

const mongoUrl = 'mongodb+srv://fullstack:test@cluster0.yxyho.mongodb.net/bloglist?retryWrites=true&w=majority'

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

module.exports = app;