const express = require('express')
const app = express()

app.use(express.json())

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
    const msg = `Phonebook has info for ${persons.length} people</br></br>
                ${new Date()}`
    response.send(msg)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
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
    if (persons.map(p => p.name).indexOf(body.name) !== -1) {
        return(response.status(400).json({
            error: "name must be unique"
        }))
    }
    const person = {
        name: body.name,
        number: body.number
    }
    //const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    person.id = Math.floor(Math.random()*100)
    persons = persons.concat(person)
    response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})