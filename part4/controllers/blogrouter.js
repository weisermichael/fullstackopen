const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const userExtractor = require("../utils/middleware").userExtractor

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  })
  
blogRouter.get('/:id', (request, response) => {
  Blog
    .findById(request.params.id)
    .then(blogs => {
      if (blogs) {
        response.json(blogs)
      }
      else{
        response.status(404).end()
      }
    })
})

blogRouter.post('/', userExtractor, async (request, response) => {
  if (!request.body.hasOwnProperty('likes')) {
    request.body['likes'] = 0
  }
  if (!request.body.hasOwnProperty('author')) {
    response.status(400).send('Bad Request')
  }
  else if (!request.body.hasOwnProperty('title')) {
    response.status(400).send('Bad Request')
  }
  else {
    const blog = new Blog(request.body)
    const user = request.user
    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const result = await blog.save()
    
    response.status(201).json(result)
  }
  })

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({error: "id not found"})
  }
  if(!(user._id.toString() === blog.user.toString())){
    return response.status(401).json({error: "token invalid"})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(201).json(request.body)
})
module.exports = blogRouter