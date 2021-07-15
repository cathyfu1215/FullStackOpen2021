
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountry from './components/ShowCountry'


const App=()=> {

  const [countryName,setCountryName]=useState('')
  const [countries, setCountries]=useState([])
  const [selectedCountry,setSelectedCountry]=useState()

//fetch all countries just one time
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        
        setCountries(response.data)
      })
  }, [])
  
  
  
  const handleInput=(event)=>{setCountryName(event.target.value)}
  

  return (
    <div>
    find countries<input value={countryName} onChange={handleInput}/>
    <ShowCountry countries={countries} countryName={countryName} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>

    </div>
  )
}

export default App;
