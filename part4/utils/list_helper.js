const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((prev, current) => {
        return prev + current.likes
}, 0)
}

const listWithOneBlog = [
    {
        "_id": "619eebfe67099cc1e05759eb",
        "title": "Michael's blog",
        "author": "Michael Weiser",
        "url": "michael.com",
        "likes": 100,
        "__v": 0
    }
]
console.log(totalLikes(listWithOneBlog))

module.exports = {
    dummy, totalLikes
}