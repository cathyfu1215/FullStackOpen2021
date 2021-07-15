

import React from 'react'
import CountryDetails from './CountryDetails'

const ShowCountry=({countries,countryName,selectedCountry,setSelectedCountry})=>{
    
    
    const matchedCountries=countries.filter(c=>c.name.toUpperCase().includes(countryName.toUpperCase()))

   const handleSelection=(c)=>{setSelectedCountry(c)}


    //if no matches:

    if (matchedCountries.length===0){return (<p>no results...</p>)}
    
    //if there is only one country, show its details

    if (matchedCountries.length===1){
      setSelectedCountry(matchedCountries[0])
      return<CountryDetails selectedCountry={selectedCountry}/>
      
    }

    //if there are countries below 10, show a list of them with a button to choose the right one to show detail

    if (matchedCountries.length>=2&&matchedCountries.length<=10)
      { return (

        <div>
        {matchedCountries.map(c => 
        
          (<li key={c.name}>{c.name}<button onClick={()=>handleSelection(c)}>show</button></li>))}
      
      <CountryDetails selectedCountry={selectedCountry}/>
        </div>)

        }

    // if there are more than 10 reuslts, ask to enter more
    else {return(<p>Please be more specific.</p>)}  
  }



export default ShowCountry