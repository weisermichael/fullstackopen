const lod = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((prev, current) => {
        return prev + current.likes
}, 0)}

const favortieBlog = (blogs) => {
    let favBlog = blogs[0]

    blogs.forEach((item) => {
        if (item.likes > favBlog.likes){
            favBlog = item
        }
    })

    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}

const blogs = [
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      } ,
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    }
  ]

const mostBlogs = (blogs) => {
    let authors = lod.countBy(blogs, (blog) => blog.author)
    let most = {
        author: "",
        blogs: ""
    }

    Object.keys(authors).reduce((prev, curr) => {
        if (authors[curr] > prev) {
            most.author = curr
            most.blogs = authors[curr]
            
            return authors[curr]
        }
        else {
            return prev
        }
    }, 0)

    return most

}

const mostLikes = (blogs) => {
    let authors = {}
    let most = {
        author: "",
        likes: ""
    }

    blogs.forEach((blog) => {
        authors.hasOwnProperty(blog.author) ? 
        authors[blog.author] += blog.likes :
        authors[blog.author] = blog.likes
    })

    Object.keys(authors).reduce((prev, curr) => {
        if (authors[curr] >= prev) {
            most.author = curr
            most.likes = authors[curr]
            return most.likes
        }
        else {
            return prev
        }
    }, 0) 
    return most
}

console.log(mostLikes(blogs))
module.exports = {
    dummy, totalLikes, favortieBlog, mostBlogs, mostLikes
}