import React,{ useState } from 'react'
import {  Form, Button } from 'react-bootstrap'

const BlogForm = ({ user,createBlog }) => {


  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState('')

  const handleBlogTitleChange=(event) => {setNewBlogTitle(event.target.value)}
  const handleBlogAuthorChange=(event) => {setNewBlogAuthor(event.target.value)}
  const handleBlogUrlChange=(event) => {setNewBlogUrl(event.target.value)}
  const handleBlogLikesChange=(event) => {setNewBlogLikes(event.target.value)}

  const addBlog=(event) => {
    event.preventDefault()
    const blogObject ={
      title:newBlogTitle,
      author:newBlogAuthor,
      url:newBlogUrl,
      likes:newBlogLikes,
      user:user

    }
    createBlog(blogObject)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
    setNewBlogLikes('')}

  return (
    <div id='formDiv'>
      <h2>Create a new blog</h2>

      <Form onSubmit={addBlog}>
        <label>Title:<input id='newBlogTitle'
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        /></label>
        <br/>
        <label>Author: <input id='newBlogAuthor'
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        /></label>

        <br/>
        <label>Url: <input id='newBlogUrl'
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        /></label>
        <br/>
        <label>Likes: <input id='newBlogLikes'
          value={newBlogLikes}
          onChange={handleBlogLikesChange}
        /></label>
        <br/>

        <Button id='save-blog'type="submit">save</Button>
      </Form>
    </div>
  )
}

export default BlogForm