import React from 'react'
import personService from '../services/personService'


const PersonForm=({persons,newName,newNumber,setPersons,setErrorMessage,setMessageType,setNewName,setNewNumber})=>{


    const addPerson=(event)=>{
        event.preventDefault()
     
        if (persons.some(p=>p.name===newName)){ // if name existed:

         if( window.confirm(`${newName} is already added to phonebook,repalce the old number with a new one?`))
         
         {
           //if duplicated and want to add a new number, update

          const personToReplace=persons.find(p=>p.name===newName)
          

          const personObject={
            name:newName,
            number:newNumber,
            id:personToReplace.id
          }

          personService
          .update(personToReplace.id,personObject)
          .then(updatedPerson=>{
            setPersons(persons.map(p=>p.id!==personToReplace.id? p :updatedPerson))

            setMessageType('success')
            setErrorMessage(`Updated ${newName} with new number:${newNumber}`)
 
          })

            // if item to update is already deleted at the server:


            .catch(error => {
              console.log("err",error)
              setPersons(persons.filter(p=>p.id!==personToReplace.id))
              setErrorMessage(`Person '${personObject.name}' was already removed from server`)
              setMessageType('fail')
            })
      
            
         }
        //if cancelled update : do nothing
        }



        else{//if no duplication , just add new person
        
        const personObject={
          name:newName,
          number:newNumber,
         
        }
        
        personService
        .create(personObject)
        .then(returnedPerson=>{setPersons(persons.concat(returnedPerson))})


        setMessageType('success')
        setErrorMessage(`Added ${newName} .`)

        setNewName('')
        setNewNumber('')
      }} 



      const handlePersonChange=(event)=>{setNewName(event.target.value)}
    
      const handleNumberChange=(event)=>{setNewNumber(event.target.value)}
    

    return(
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)

    }

    export default PersonForm