
import React, { useState ,useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ME ,BOOK_ADDED,ALL_BOOKS} from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  let user
  
 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("library-user-token");
    if (loggedInUser) {
      setToken(loggedInUser);
      
    }
  }, [setToken]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

const {loading,data}=useQuery(ME)
console.log("result",data)

if(!loading){user=data.me}


const Logout=()=>{
  setErrorMessage('User logged out.')
  setToken(null)
  localStorage.clear()
  client.resetStore()
  console.log(`User logged out.`)
}

const notify = (message) => {
  
  setErrorMessage(message)
  setTimeout(() => {
    setErrorMessage(null)
  }, 10000)
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

  if(token){// if user is logged in

  return (
    <div>
      <div className='Navigation'>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => Logout()}>Log out</button>
      </div>
      <Notify errorMessage={errorMessage} />
      

      <Authors
        show={page === 'authors'} setError={notify} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'} setError={notify} updateCacheWith={updateCacheWith}
      />

      <Recommended show={page==='recommended'} user={user}/>

    
    </div>
  )
  }

  else{// if no user is logged in, cannot add book or update author
    return(
      <div>
        
         <div className='Navigation'>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>Log in</button>
        </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <LoginForm
          setToken={setToken}
          setError={notify}
          show={page === 'login'}
        />


      </div>
    )
  }
}

export default App