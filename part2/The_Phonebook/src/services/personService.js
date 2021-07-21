import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
  
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
  
}

const remove = (p)=>{
  
  axios.delete(`${baseUrl}/${p.id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll,create,update,remove}