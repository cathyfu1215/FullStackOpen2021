

import React from 'react'
import Weather from './Weather'


const CountryDetails=({selectedCountry})=>{
      
    

    const Languages=()=>{
    const languageArray=selectedCountry.languages
    return(languageArray.map(l => {return <li key={l.name}>{l.name}</li>}))}



    //this block only shows up when selectedCountry is not null

    if(selectedCountry){

        return(
        <div>
        <h1>{selectedCountry.name}</h1>
        <h5>capital:{selectedCountry.capital}</h5>
        <h5>population:{selectedCountry.population}</h5>
        <h2>languages</h2>
        <Languages/>
        <br/>
        <img src={selectedCountry.flag} alt="country flag" height="125px"/>
        <Weather selectedCountry={selectedCountry}/>
        </div>)
    }

    else{return null}

}

 export default CountryDetails