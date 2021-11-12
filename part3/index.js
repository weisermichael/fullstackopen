require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Note = require('./models/phone')

const app = express()

app.use(express.json())
morgan.token('post', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Note.find({}).then(p => {
        const msg = `Phonebook has info for ${p.length} people</br></br>
                ${new Date()}`
        response.send(msg)
    })
    
})

app.get('/api/persons', (request, response) => {
    Note.find({}).then(notes =>{
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    //const id = Number(request.params.id)
    /*const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    } */

    Note.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
   /*  const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end() */

    Note.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if (!body.name) {
        return(response.status(400).json({
            error: "name missing"
        }))
    }
    if (!body.number) {
        return(response.status(400).json({
            error: "number missing"
        }))
    }
    /*if (persons.map(p => p.name).indexOf(body.name) !== -1) {
        return(response.status(400).json({
            error: "name must be unique"
        }))
    }*/
    const person = new Note({
        name: body.name,
        number: body.number,
        date: new Date()
    })
    //const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    //person.id = Math.floor(Math.random()*100)
    //persons = persons.concat(person)
    //response.json(persons)
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})