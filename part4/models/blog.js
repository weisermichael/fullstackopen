const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})
  
blogSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog