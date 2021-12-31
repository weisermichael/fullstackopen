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

test("property named id, not _id", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body[0].id).toBeDefined()
       
})

test("POST request adds blog", async () => {
    const newBlog = {
        "title": "Fourth Test Blog",
        "author": "Fourth Test Author",
        "url": "testblog.biz",
        "likes": 6
    }

    await api.post("/api/blogs")
             .send(newBlog)
             .expect(201)
    
    const blogs = await api.get("/api/blogs")
    expect(blogs.body.length).toBe(testBlogList.length + 1)
    expect(blogs.body[testBlogList.length]["title"]).toBe("Fourth Test Blog")
})

test("missing likes default to 0", async () => {
    const newBlog = {
        "title": "Fourth Test Blog",
        "author": "Fourth Test Author",
        "url": "testblog.biz"
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(201)

    const blogs = await api.get('/api/blogs')
    expect(blogs.body[testBlogList.length]['likes']).toBe(0)

})

test("responds 400 to missing title and author", async () => {
    const newBlog = {
        "url": "testblog.biz",
        "likes": 6
    }

    await api.post("/api/blogs")
             .send(newBlog)
             .expect(400)
})
afterAll(() => {
    mongoose.connection.close
})