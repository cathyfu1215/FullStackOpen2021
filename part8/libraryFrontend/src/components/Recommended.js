import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, } from '../queries'


const Recommended=({show,user})=>{


const {loading,data}=useQuery(ALL_BOOKS)

if(loading){return <div>loading...</div>}


const books=data.allBooks
let recommendedBooks=[]
books.forEach(book => {
    if(book.genres.includes(user.favoriteGenre)){recommendedBooks=recommendedBooks.concat(book)}
    
})


  

if (!show) {return null}

return(
    <div>
        <h2>Recommended books for {user.username}:genre:{user.favoriteGenre}</h2>
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

          {recommendedBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>

            </tr>
          )}
          
          
        </tbody>
      </table>
    </div>
)

}
export default Recommended