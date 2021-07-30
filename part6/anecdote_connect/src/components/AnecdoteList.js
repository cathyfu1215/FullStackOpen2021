import React,{useState} from 'react'
import {vote} from '../reducers/anecdoteReducer'
import Filter from './Filter'
import { notificationChange,clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteList=(props)=>{

  //since this is the only "state" to manage, I choose useState instead of Redux
const [lastTimeOutID,setLastTimeOutID]=useState(null)

  const compareFn=(a,b)=>{
    if(a.votes>b.votes){return -1}
    if(a.votes<b.votes){return 1}
    return 0
  }
  const sortedAnecdotes=props.anecdotes.sort(compareFn,props.anecdotes.votes)
 
  
 //below: vote as well as notify
  const voteForAnecdote=(id)=>{

    //clear old timeout function 
    clearTimeout(lastTimeOutID)
    
    props.vote(id)
    props.notificationChange(`you voted for "${props.anecdotes.find(a=>a.id===id).content}"`)
    
    var TimeoutID=setTimeout(()=>{props.clearNotification()},5000)

    //save the id of the new time out function
    setLastTimeOutID(TimeoutID)
  }

  const DisplayAnecdotes=()=>{
 
    const filteredAnecdotes=sortedAnecdotes.filter(anecdote=>anecdote.content.toUpperCase().includes(props.filter.toUpperCase()))

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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification:state.notification
  }
}

const mapDispatchToProps = {
  vote,
  notificationChange,
  clearNotification
  
}
const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList