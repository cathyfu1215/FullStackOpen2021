import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll =  () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {  //create items needs authorization
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(id, newObject) => {  // like do not need authorization
  const request= axios.put(`${baseUrl}/${id}`, newObject)
  const response=await request
  return response.data
}

const remove= async (blog) => {   //delete items needs authorization

  const config = {
    headers: { Authorization: token },
  }
  const request= axios.delete(`${baseUrl}/${blog.id}`, config)
  const response=await request
  return response.data
}


export default { getAll, create, update, setToken,remove }