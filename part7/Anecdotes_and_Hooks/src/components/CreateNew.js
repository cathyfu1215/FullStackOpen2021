import  { useField } from '../hooks'

const CreateNew = (props) => {
 
    const content=useField('content')
  
    const author=useField('author')
    
    const info=useField('info')
    
    
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
      
    }
  
    const clearALL=()=>{
     content.clear()
     author.clear()
     info.clear()
      console.log('all clear')
    }
  
   
    return (
  
      <div>
      <h2>create a new anecdote</h2>
      <form >
        <div>
          content
          <input  {...content} clear=''/>
        </div>
        <div>
          author
          <input  {...author} clear='' />
        </div>
        <div>
          url for more info
          <input  {...info} clear=''/>
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={clearALL}>reset</button>
      </form>
    </div>
  )
    }

    export default CreateNew
  