import React, { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()

const Weather = ({weatherData}) => {
  const imgSrc = weatherData.current.weather_icons[0]
  return (
    <>
      <b>temperature: </b>{weatherData.current.temperature} Celcius <br/>
      <img src={imgSrc}/> <br/>
      <b>wind: </b> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir} <br/>
    </>
  )
}

const CountryInfo = ({i, countries, disp}) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  //console.log(process.env.REACT_APP_API_KEY);
  const urlStr = "http://api.weatherstack.com/" + "current?access_key=" + api_key + "&query=" + countries[i].capital
  useEffect(() =>{
    console.log("effect")
    axios.get(urlStr).then((response) => {setWeatherData(response.data)})
  }, [])

  if (disp) {
    return (
      <>
        <h1>{countries[i].name.common}</h1>
        <br/>
        capital: {countries[i].capital} <br/>
        population: {countries[i].population} <br/>
        <h2>languages</h2>
        <ul>
          {Object.values(countries[i].languages).map((l, a) => <li key={a}>{l}</li>)}
        </ul>
        <img src={countries[i].flags.png} alt="flag" />
        <br/>
        <h2>Weather in {countries[i].capital}</h2>
        {weatherData && <Weather weatherData={weatherData} /> }
      </>
    )
  }
  else{
    return(
      <> </>
    )
  }
}

const Display = ( {countries, search, namesSearched, commonNames, handleChange, handleClick, displayCountry} ) => {

/*   const getWeather = (ind) => {
    let weather = ""
    const urlStr = "current?access_key=" + process.env.REACT_APP_API_KEY + "&query=" + countries[ind].capital
    useEffect(() =>
    axios.get("http://api.weatherstack.com/" + urlStr)
         .then(response => weather=response.data))
    return weather
  }
 */
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
        <CountryInfo i={i} countries={countries} disp={true}/>
      </div>
    )
  }

  return (
    <div>
      find countries <input value={search} onChange={handleChange}></input>
      <ul>
        {namesSearched.map(n => <>
                                  <li ind={commonNames.indexOf(n)} 
                                      key={commonNames.indexOf(n)}> {n} 
                                    <button key={commonNames.indexOf(n)}
                                            onClick={handleClick}>show</button>
                                    
                                  </li>
                                  <CountryInfo key={1+commonNames.indexOf(n)} 
                                               i={commonNames.indexOf(n)} 
                                               countries={countries} 
                                               disp={displayCountry[commonNames.indexOf(n)]}/>
                                </>)}
        
      </ul>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [displayCountry, setDisplay] = useState([])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) => {
    const newArr = [...displayCountry]
    if (displayCountry[event.target.parentElement.getAttribute('ind')] === true) {
      newArr[event.target.parentElement.getAttribute('ind')] = ''
    }
    else{
      newArr[event.target.parentElement.getAttribute('ind')] = true
    }
    setDisplay(newArr)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
         .then(response => setCountries(response.data))},[])
  
  const commonNames = countries.map(c => c.name.common)
  const namesSearched = commonNames.filter(n => n.toLowerCase().includes(search.toLowerCase()))


  return (
    <Display countries={countries}
             search={search} 
             namesSearched={namesSearched} 
             commonNames={commonNames} 
             handleChange={handleChange} 
             handleClick={handleClick}
             displayCountry={displayCountry} />
  )
}

export default App;
