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
  const [ filterParam, setFilterParam ] = useState('')

  const handleNameChange = (event) => {
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

  const handleFilter = (event) => {
    setFilterParam(event.target.value)
  }

  const toShow = (!filterParam) ? persons : persons.filter(p=> p.name.toLowerCase().slice(0, filterParam.length) === filterParam)

  return (
    <div>
      <h2>Phonebook</h2>
      <div> filter shown with <input onChange={handleFilter}></input></div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div> name:   <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNum}  onChange={handleNumChange}></input> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {toShow.map(person=> <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App