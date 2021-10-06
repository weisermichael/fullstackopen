import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
         .then(response => setCountries(response.data))},[])
  
  const commonNames = countries.map(c => c.name.common)
  const namesSearched = commonNames.filter(n => n.toLowerCase().includes(search.toLowerCase()))

  if (search.length === 0) {
    return (
      <div>
        find countries <input value={search} onChange={handleChange}></input>
        <br/>
        specify a filter
      </div>
    );
  }

  else if (namesSearched.length > 10) {
    return (
      <div>
        find countries <input value={search} onChange={handleChange}></input>
        <br/>
        Too many matches, specify another filter
      </div>
    );
  }

  else if (namesSearched.length === 1){
    const i = commonNames.indexOf(namesSearched[0])
    return (
      <div>
        find countries <input value={search} onChange={handleChange}></input>
        <h1>{countries[i].name.common}</h1>
        <br/>
        capital: {countries[i].capital} <br/>
        population: {countries[i].population} <br/>
        <h2>languages</h2>
        <ul>
          {Object.values(countries[i].languages).map(l => <li>{l}</li>)}
        </ul>
        <img src={countries[i].flags.png} alt="flag" />
      </div>
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={handleChange}></input>
      <ul>
        {namesSearched.map(n => <li>{n}</li>)}
      </ul>
    </div>
  );
}

export default App;
