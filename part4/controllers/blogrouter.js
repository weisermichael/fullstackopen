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

    const result = await blog.save()
    response.status(201).json(result)
  }
  })

module.exports = blogRouter