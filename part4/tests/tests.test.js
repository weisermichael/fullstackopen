const supertest = require("supertest")
const mongoose = require("mongoose")
const app = require("../app.js")
const Blog = require('../models/blog.js')
const config = require('../utils/config.js')

const api = supertest(app)

let testBlogList = [
    {
        "title": "Test Blog",
        "author": "Test Author",
        "url": "testblog.gov",
        "likes": 123
    },
    {
        "title": "Second Test Blog",
        "author": "Second Test Author",
        "url": "testblog.com",
        "likes": 4
    },
    {
        "title": "Third Test Blog",
        "author": "Third Test Author",
        "url": "testblog.org",
        "likes": 5
    }
]
beforeEach(async () => {

    await Blog.deleteMany({})

    const blogObjects = testBlogList.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blog => blog.save())
    await Promise.all(blogPromises)
})

test("get request returns list", async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(blogs.body.length).toBe(3)
}, 100000)

afterAll(() => {
    mongoose.connection.close
})