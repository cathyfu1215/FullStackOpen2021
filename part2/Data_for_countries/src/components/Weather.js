import axios from 'axios'
import React ,{ useEffect, useState }from 'react'

    const Weather=({selectedCountry})=>{

        const [weather,setWeather]=useState()
         
             useEffect(() => {
                axios
                  .get(`https://goweather.herokuapp.com/weather/${selectedCountry.capital}`)
                  .then(response => {
                    
                    setWeather(response.data)
                  })
              }, [selectedCountry.capital])
 
 
              if(weather){
         return(
             <div>
                 <h3>weather in {selectedCountry.capital}</h3>
                 <p>weather state:{weather.description}</p>
                 <p> temp:{weather.temperature}</p>
                 <p>wind:{weather.wind}</p>
             </div>
         )
     }
     else{return null}
    }

     export default Weather