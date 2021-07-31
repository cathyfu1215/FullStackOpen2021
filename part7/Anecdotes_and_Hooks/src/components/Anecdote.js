import {useParams} from "react-router-dom"

const Anecdote=({ anecdotes })=>{
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === id) 
    
    return (
      <div>
        
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>For more info, see {anecdote.info}</p>
        <p>has {anecdote.votes} votes .</p>
        
      </div>
    )
  }

  export default Anecdote