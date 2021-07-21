
import React from 'react'

const Persons=({personsToShow,confirmDeletion})=>
{
  return(  
    personsToShow.map(p=>
    <p key={p.id}>
      {p.name}   {p.number} 
      <button onClick={()=>{confirmDeletion(p)}}>delete</button>
    </p>
    ))
} 

export default Persons