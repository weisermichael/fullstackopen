import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayPerson = ( {toShow} ) => (
  <>
    <h2>Numbers</h2>
    {toShow.map(person=> <p key={person.name}>{person.name} {person.number}</p>)}
  </>
)

const PersonForm = ( {handleSubmit, handleNameChange, handleNumChange, newName, newNum}) => (
  <form onSubmit={handleSubmit}>
  <div> name:   <input value={newName} onChange={handleNameChange}/> </div>
  <div> number: <input value={newNum}  onChange={handleNumChange}></input> </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Filter = ( {handleFilter} ) => (
  <div> filter shown with <input onChange={handleFilter}></input></div>
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => setPersons(response.data))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filterParam, setFilterParam ] = useState('')

  const handleChange = (func) => {
    const handler = (event) => {
      func(event.target.value)
    } 
    return(
      handler
    )
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
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} 
                  handleNameChange={handleChange(setNewName)} 
                  handleNumChange={handleChange(setNewNum)}
                  newName={newName}
                  newNum={newNum} />
      <DisplayPerson toShow={toShow} />
    </div>
  )
}

export default App