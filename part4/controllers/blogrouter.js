const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

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

    if (!request.body.hasOwnProperty('user')) {   //assign random user to blog being posted
      user_author = await User.findOne( {name: request.body.author} ) //attempts to find user with blog authors name
      random_user = await User.findOne()  //random user
      if (user_author.name === request.body.author) { //if author has user, assign to blog
        blog.user = user_author._id
        user_author.blogs = user_author.blogs.concat(blog._id)
        await user_author.save()
      }
      else{ //assign random user
        blog.user = random_user._id
        random_user.blogs = user_author.blogs.concat(blog._id)
        await random_user.save()
      }
      
    }
    const result = await blog.save()
    
    response.status(201).json(result)
  }
  })

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(201).json(request.body)
})
module.exports = blogRouter