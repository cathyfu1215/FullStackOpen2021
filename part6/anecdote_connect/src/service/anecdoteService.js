import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { 
    content:content,
    votes:0 
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteForAnecdote = async (id)=>{
  const allAnecdotesResponse=await axios.get(baseUrl)

  const anecdoteToChange=allAnecdotesResponse.data.find(n=>n.id===id)
  
  const votedAnecdote={
    content:anecdoteToChange.content,
    votes:anecdoteToChange.votes+1,
    id:anecdoteToChange.id
  }
  const response=await axios.put(`${baseUrl}/${id}`,votedAnecdote)
  return response.data
}

export default { getAll , createNew,voteForAnecdote}