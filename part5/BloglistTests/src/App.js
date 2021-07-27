/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import ErrorNotification from'./components/ErrorNotification'
import SuccessNotification from'./components/SuccessNotification'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  const compareFN=(a,b) => {      //sort blogs by likes, descending
    if(a.likes<b.likes){return 1}
    if(a.likes>b.likes){return -1}
    else return 0
  }

  const sortedBlogs=blogs.sort(compareFN)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog=(blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})

    setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added.`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

  }


  const userLogout=() => {
    console.log(`${user.name} is logged out.`)
    setSuccessMessage(`${user.name} is logged out.`)
    window.localStorage.clear()

  }

  return (
    <div>
      <h1>Blogs</h1>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null
        ?
        <Togglable buttonLabel=' User Login'>
          <LoginForm setUser={setUser} user={user}/>
        </Togglable>

        :
        <div>
          <p>{user.name} , logged-in .  {' '}
            <button onClick={() => userLogout()}>Log Out</button></p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} user={user}/>
          </Togglable>

          <h2>blogs</h2>
          {sortedBlogs.map(blog =>

            <Blog key={blog.id} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} setBlogs={setBlogs} blogs={blogs} user={user} blog={blog} />

          )}
        </div>
      }



    </div>
  )
}

export default App