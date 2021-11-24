const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let willSave = true

if (process.argv.length == 3) {
    willSave = false
}

if (process.argv.length < 5 && process.argv.length != 3) {
    console.log('Please provide the entry as an argument: node mongo.js <password> <name> <number>')
    //console.log(process.argv.length)
    process.exit(1)
  }

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.yxyho.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

noteSchema.plugin(uniqueValidator)
const Note = mongoose.model('Note', noteSchema)

if (willSave) {
    const name = process.argv[3]
    const num = process.argv[4]
    
    const note = new Note({
      name: name,
      number: num,
      date: new Date(),
    })
    
    note.save().then(result => {
      console.log('note saved!')
      console.log(`added ${name} number ${num} to phonebook`)
      mongoose.connection.close()
    }) 
} 

else {
    Note.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
          console.log(note.name, note.number)
        })
        mongoose.connection.close()
        process.exit(1)
    })
}