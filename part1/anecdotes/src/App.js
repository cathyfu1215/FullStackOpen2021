import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  //create array filled with 0, having a length of the anecdotes array's length
  const EmptyArray=new Array(anecdotes.length).fill(0)
  
  //states:
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState(EmptyArray)


  
  const GenerateRandomAnecdote=()=>setSelected(Math.floor(Math.random() * anecdotes.length))
  
 //vote for selected anecdotes
  const PlusOne=()=>{
    const NewVotes= [...votes]
    NewVotes[selected]+=1
    setVotes(NewVotes)
  }

  //find max vote
  const maxValue=Math.max.apply(Math, votes)
  const maxIndex=votes.indexOf(maxValue)
 
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes.</p>
      
      <button onClick={PlusOne}>vote</button>
      <button onClick={GenerateRandomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <p>has {maxValue} votes.</p>
    </div>
  )
}

export default App