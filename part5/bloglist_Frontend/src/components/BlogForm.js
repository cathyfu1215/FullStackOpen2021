import React,{ useState } from 'react'

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
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>Title:<input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        /></label>
        <br/>
        <label>Author: <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        /></label>

        <br/>
        <label>Url: <input
          value={newBlogUrl}
          onChange={handleBlogUrlChange}
        /></label>
        <br/>
        <label>Likes: <input
          value={newBlogLikes}
          onChange={handleBlogLikesChange}
        /></label>
        <br/>

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm