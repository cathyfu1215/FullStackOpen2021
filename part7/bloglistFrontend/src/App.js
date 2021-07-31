/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './style.css'

import { Table , Button,Alert,Navbar,Nav } from 'react-bootstrap'


import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] =useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {

    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  const compareFN=(a,b) => {
    if(a.likes<b.likes){return 1}
    if(a.likes>b.likes){return -1}
    else return 0
  }

  const sortedBlogs=blogs.sort(compareFN)


  const Blogs=({ blogs }) => {

    if(!blogs){return (<div></div>)}

    return(
      <div>
        <h2>Blogs</h2>

        <Table striped>
          <tbody>
            {blogs.map(blog => {
              return(
                <tr key={blog.title}>
                  <td> <Link to={`/blogs/${blog.id}`}>{blog.title}
              by{blog.author}
                  </Link></td>
                </tr>
              )})}
          </tbody>
        </Table>
      </div>

    )

  }

  const Users=({ users }) => {

    if(!users){return (<div></div>)}


    return(<div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>user name</th>
            <th>number of blogs</th>

          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return(<tr key={user.name}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
            </tr>)})}
        </tbody>
      </Table>
    </div>

    )}

  const UserDisplay=({ users }) => {
    const id=useParams().id
    const user=users.find(u => u.id===id)


    if (!user) {
      return null
    }
    return(

      <div>
        <h2>{user.name}</h2>
        <h3>Added Blogs</h3>
        {user.blogs.map(blog => {return(<li key={blog.title}>{blog.title}</li>)})}
      </div>

    )}

  const BlogDisplay=({ blogs }) => {
    const id=useParams().id
    const blog=blogs.find(b => b.id===id)


    if (!blog) {
      return null
    }

    return(

      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <Blog setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} user={user}setBlogs={setBlogs} blogs={blogs} blog={blog} />
      </div>

    )}


  const createBlog=(blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})

    setSuccessMessage(` ${blogObject.title} by ${blogObject.author} is added.`)
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
    <div className='container'>
      <Router>

        <div className='Navigation'>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link  to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link  to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {user === null
                    ?<div className="LoginForm">
                      <Togglable buttonLabel=' User Login'>
                        <LoginForm setUser={setUser} user={user}/>
                      </Togglable>
                    </div>
                    :
                    <div className="LoggedInUser">
                      <p>{user.name} , logged-in .
                        <Button onClick={() => userLogout()}>Log Out</Button></p>
                    </div>}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>


        <div>
          <h1>Blog Application</h1>
          <div className='NotificationContainer'>
            {(errorMessage && <Alert variant="fail">{errorMessage}</Alert>)}

            {(successMessage && <Alert variant="success">{successMessage}</Alert>)}
          </div>
        </div>


        <div className="showCreateBlogIfLoggedIn">
          {user===null
            ?<div></div>

            : <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm createBlog={createBlog} user={user}/>
              </Togglable>
            </div>
          }
        </div>


        <Switch>
          <Route path="/users/:id">
            <UserDisplay users={users}/>
          </Route>
          <Route path="/blogs/:id">
            <BlogDisplay blogs={sortedBlogs}/>
          </Route>
          <Route path="/users">
            <Users users={users}/>
          </Route>
          <Route path="/">
            <Blogs blogs={blogs}/>
          </Route>
        </Switch>


      </Router>
    </div>
  )
}

export default App