const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    userName: String,
    passwordHash: String,
    notes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})
const User = mongoose.model('User', userSchema)
module.exports = User