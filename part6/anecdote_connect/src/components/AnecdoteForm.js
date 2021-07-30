import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange,clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm=(props)=>{

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        notify(content)
        
      }

      const notify=(content)=>{
        props.notificationChange(`you have created ${content}`)
        setTimeout(()=>{props.clearNotification()},5000)
      }
    
return(
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>add anecdote</button>
      </form>
      </div>
)
}

const mapDispatchToProps = {
  createAnecdote,
  notificationChange,
  clearNotification
}

const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm 