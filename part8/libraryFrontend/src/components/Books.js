import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import {useState} from 'react'

const Books = ({show}) => {

  const {loading,data}=useQuery(ALL_BOOKS)
  const [currentGenre,setCurrentGenre]=useState(null)
  
  if(loading){return <div>loading...</div>}
  
 
  const books=data.allBooks
  

 
  let genreSet=[]
  books.forEach(book => {
    
    book.genres.forEach(genre=>{
      
      if(!genreSet.includes(genre)){
      genreSet=genreSet.concat(genre)
    }
    })
  });

  

  let filteredBooks=[]
  books.forEach(book=>{
    if(book.genres.includes(currentGenre)){filteredBooks=filteredBooks.concat(book)}

  })
  
  

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre: {currentGenre}</div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          
          {(currentGenre===null)
          ?books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>

            </tr>
          )
          :filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>

            </tr>
          )}
          
        </tbody>
      </table>


      {genreSet.map(genre=><button key={genre} onClick={()=>setCurrentGenre(`${genre}`)}>{genre}</button>)}
      <button onClick={()=>setCurrentGenre(null)}>show all books</button>
    </div>
  )
}

export default Books