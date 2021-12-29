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

module.exports = {
    dummy, totalLikes, favortieBlog
}