import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSubmit = (event) => {
    if ((persons.map(p=>p.name)).indexOf(newName) === -1){
      event.preventDefault()
      const newPerson = {name: newName, number: newNum, id: persons.length+1}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNum('')
    }
    else{
      alert(`${newName} is already added to phonebook!`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div> name:   <input value={newName} onChange={handleChange}/> </div>
        <div> number: <input value={newNum}  onChange={handleNumChange}></input> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=> <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App