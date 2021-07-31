import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ setErrorMessage,setSuccessMessage,user,setBlogs,blogs,blog } ) => {


  const likeBlog=() => {
    setSuccessMessage(`you liked ${blog.title}.Increase its likes by 1.`)
    setTimeout(() => {
      setSuccessMessage(null)

    }, 5000)
    const updatedBlog={
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:blog.likes+1,
      user:blog.user
    }
    blogService
      .update(blog.id,updatedBlog)

  }

  const deleteButton=(blog) => {

    if (user.username===blog.user.username){return (<button id='delete-blog' onClick={() => {deleteBlog(blog)}}>delete</button>)}
    else return('')
  }

  const deleteBlog=(blog) => {
    if(window.confirm(`delete blog :${blog.title}?`))

    {
      try {
        blogService.remove(blog)
        setSuccessMessage(`Deleted blog:${blog.title}.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id!==blog.id))}

      catch (exception){
        setErrorMessage('User token expired.PLease log in again')
        setSuccessMessage(null)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }

    }}



  return(

    <div>
      <div className='detail'>Url: {blog.url} Likes:{blog.likes}  Created by :{blog.user.name}
        <button id='like-blog' onClick={likeBlog}>Like</button>
        {deleteButton(blog)}</div>

    </div>
  )
}

export default Blog