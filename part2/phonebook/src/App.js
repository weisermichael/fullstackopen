import React, { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  if (type === "error"){
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  return (
    <div className='msg'>
      {message}
    </div>
  )
}

const DisplayPerson = ( {toShow, handleDelete} ) => (
  <>
    <h2>Numbers</h2>
    {toShow.map(person=>  <p key={person.name}>{person.name} {person.number}
                            <button onClick={() => handleDelete(person.name, person.id)}>delete</button>
                          </p>)}
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
    phonebookService.getAll().then(response => setPersons(response.data))
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ filterParam, setFilterParam ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ type, setType ] = useState('error')

  const handleChange = (func) => {
    const handler = (event) => {
      func(event.target.value)
    } 
    return(
      handler
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if ((persons.map(p=>p.name)).indexOf(newName) === -1){  //check if name already exists
      const newPerson = {name: newName, number: newNum}
      phonebookService.create(newPerson).then(response =>
        {setPersons(persons.concat(newPerson))
        setType('notification')
        setMessage(`${newName} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNum('')
      }).catch(error => {
        setType('error')
        console.log(error.response.data.error)
        setMessage(`Validation failed: ${error.response.data.error}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNum('')
      })
    }
    else{
      const result = window.confirm(`${newName} is already added to phonebook. Replace old number with a new number?`)
      if (result){
        let person = persons.filter(p=> p.name === newName)[0]
        //const id = (persons.map(p=>p.name)).indexOf(newName) + 1
        const id = person.id
        const newPerson = {...person, number: newNum}
        phonebookService.create(newPerson).then(response => {
          setPersons(persons.map(p => p.id !== id ? p : newPerson))
          setType('notification')
          setMessage(`${newName} updated`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNum('')
        }).catch(error => {
          setType('error')
          console.log(error.response.data.error)
          setMessage(`Validation failed: ${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNum('')
        })
      }
    }
  }

  const handleDelete = (name, id) => {
    const result = window.confirm(`Delete ${name}?`)
    if (result) {
      phonebookService.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const handleFilter = (event) => {
    setFilterParam(event.target.value.toLowerCase())
  }

  const toShow = (!filterParam) ? persons : persons.filter(p=> p.name.toLowerCase().slice(0, filterParam.length) === filterParam)

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} type={type} />
      <Filter handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} 
                  handleNameChange={handleChange(setNewName)} 
                  handleNumChange={handleChange(setNewNum)}
                  newName={newName}
                  newNum={newNum} />
      <DisplayPerson toShow={toShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App