import React, { useState } from 'react'
import {BrowserRouter as Router,Switch, Route, Link, Redirect} from "react-router-dom"

import Footer from './components/Footer'
import About from './components/About'
import ShowNotification from './components/ShowNotification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'



const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')
  

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} has been added.`)
    setTimeout(() => {setNotification('')
      
    }, 10000);
 
  }


  const padding = {
    paddingRight: '1em', 
    paddingLeft:'0.5em'
 }
  

  return (
     
      <Router>
        <div>
         <h1>Software anecdotes</h1>
        
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create_new'>crate new</Link>
        <Link style={padding} to='/about'>about</Link>
        </div>

      
       <ShowNotification notification={notification}  />
       <Switch> 
       
         <Route path="/anecdotes/:id">
           <Anecdote anecdotes={anecdotes} />
         </Route>

         <Route path="/create_new">
           {(notification==='')
            ?<CreateNew addNew={addNew} />
            :<Redirect to='/'/>
           }
           
         </Route>
         <Route path="/about">
           <About/>
         </Route>
         <Route path="/">

         <AnecdoteList anecdotes={anecdotes}/>
         </Route>



       </Switch>

       <Footer/>

      </Router>
     
   
  )
}

export default App;