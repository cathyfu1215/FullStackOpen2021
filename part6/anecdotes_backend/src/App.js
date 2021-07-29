import React , {useEffect}from 'react'
import AnecdoteForm from'./components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import anecdoteService from './service/anecdoteService'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import store from './Store'


const App = () => {
  const dispatch=useDispatch()
 
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch]) 
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App