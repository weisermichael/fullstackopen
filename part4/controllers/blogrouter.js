const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
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
    const token = request.token
    //console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!(decodedToken.id)){
      return response.status(401).json({error: "token missing or invalid"})
    }
    const user = await User.findById(decodedToken.id)

    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const result = await blog.save()
    
    response.status(201).json(result)
  }
  })

blogRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!(decodedToken.id)){
    return response.status(401).json({error: "token missing or invalid"})
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
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