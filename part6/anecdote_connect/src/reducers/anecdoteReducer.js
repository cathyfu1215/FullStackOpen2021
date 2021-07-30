import anecdoteService from "../service/anecdoteService"

export const createAnecdote=(content)=>{
  
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (id) => {
 
  return async dispatch=>{
    
    const votedAnecdote= await anecdoteService.voteForAnecdote(id)
    
    dispatch({
      type: 'VOTE',
      data: id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const reducer = (state = [], action) => {
  
 switch(action.type){

  case'NEW_ANECDOTE':
  return [...state,action.data]

  case 'INIT_ANECDOTES':
      return action.data
  
  case'VOTE':{
    const id=action.data
    const anecdoteToChange= state.find(n=> n.id===id)
    const changedAnecdote={
      ...anecdoteToChange,
      votes:anecdoteToChange.votes+1
    }
    return state.map(anecdote=>anecdote.id!== id? anecdote:changedAnecdote)
  }
   

  default:
  return state
}
  
}


export default reducer