import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/personService'




const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('insert a person')
  const [ newNumber, setNewNumber ] = useState('insert a number')
  const [ newFilter,setNewFilter]= useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [messageType,setMessageType] = useState('')

// messageType has two states: 'success' and 'fail'
// success message will be in green, fail message in red

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons=>{
      setPersons(initialPersons)
    })
  }, [persons])     //fetch person list whenever person changes
  


  //filter person case-insensitive
  const personsToShow= (newFilter==='')
  ?persons
  :persons.filter(p=> p.name.toUpperCase().includes(newFilter.toUpperCase()))
  



  
  const confirmDeletion=(p)=>{
    if(window.confirm(`Delete ${p.name}?`)){
      personService
      .remove(p)
      
    setPersons(persons.filter(person=>person.id!==p.id))
    setMessageType('success')
    setErrorMessage(`Deletion of ${p.name} completed!`)
    console.log(p.id)
    
    }}


  return (
    <div>
     
      <h2>Phonebook</h2>
      <Notification messageType={messageType} message={errorMessage} />
      <br/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>

      <h2>add a new</h2>
  
      <PersonForm newName={newName} newNumber={newNumber} persons={persons} 
      setNewName={setNewName} setNewNumber={setNewNumber} setPersons={setPersons}
      errorMessage={errorMessage} setErrorMessage={setErrorMessage}
      messageType={messageType} setMessageType={setMessageType}/>
      
      <h2>Numbers</h2>
    <Persons personsToShow={personsToShow} confirmDeletion={confirmDeletion}/>
    </div>
  )
}

export default App