import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { notificationChange } from '../reducers/notificationReducer'


const AnecdoteList=()=>{
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter=useSelector(state=>state.filter)

  const compareFn=(a,b)=>{
    if(a.votes>b.votes){return -1}
    if(a.votes<b.votes){return 1}
    return 0
  }
  const sortedAnecdotes=anecdotes.sort(compareFn,anecdotes.votes)
 // sort anecdotes by votes it received, descending
  

  const voteForAnecdote=(id)=>{//when vote, also notification
    dispatch(vote(id))
    dispatch(notificationChange(`you voted for "${anecdotes.find(a=>a.id===id).content}"`))
    setTimeout(()=>{dispatch(notificationChange(null))},5000)
  }

  const DisplayAnecdotes=()=>{
 
    const filteredAnecdotes=sortedAnecdotes.filter(anecdote=>anecdote.content.toUpperCase().includes(filter.toUpperCase()))

    return (filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
  }

  return(
    <div>
    <Filter/>
    <DisplayAnecdotes/>
   
  </div>
  )
 
}

export default AnecdoteList