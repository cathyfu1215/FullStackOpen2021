import React,  {useState}    from 'react' 
import Select from 'react-select'
import { useQuery , useMutation} from '@apollo/client'
import {ALL_AUTHORS} from '../queries'
import { SET_BIRTHYEAR } from '../queries'




const Authors = ({show,setError,token}) => {
  
 // eslint-disable-next-line no-unused-vars
 const [name,setName]=useState('')
  const [setBornTo,setSETBornTo]=useState('')
  const [changeBirthyear]=useMutation(SET_BIRTHYEAR,{refetchQueries:[{query:ALL_AUTHORS}],
    onError: (error) => {
    setError(error.graphQLErrors[0].message)
  }})

  const[selectedOption, setSelectedOption]=useState(null)
 

const setBirthyear= async(event)=>{
  event.preventDefault()
  
  console.log('name is ',selectedOption.value,"birthyear is :", setBornTo)
  changeBirthyear({variables:{name:selectedOption.value,setBornTo:setBornTo}})
  
  const message= token? `set ${selectedOption.value}'s birthyear to ${setBornTo}`
                     :`log in to update author`
  
  setError(message)
  setName('')
  setSETBornTo('')
}


const {loading,data}=useQuery(ALL_AUTHORS)
if(loading){return <div>loading...</div>}



const authors=data.allAuthors
const options=authors.map(a=>{return{value:a.name,label:a.name}})





  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={setBirthyear}>
        <div>name
          
          <Select defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options} />
         </div>
        <div>born
        <input type='number' value={setBornTo} onChange={(event)=>{setSETBornTo(Number(event.target.value))}}/></div>
        <button type='submit'>update author</button>
      
      </form>

    </div>
  )
}

export default Authors
