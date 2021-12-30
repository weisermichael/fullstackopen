const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogRouter