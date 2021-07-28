
const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
{title: 'Blog1',
author: 'Author1',
url: 'URL1',
likes: 1},

{title: 'Blog2',
author: 'Author2',
url: 'URL2',
likes: 2},

{title: 'Blog3',
author: 'Author3',
url: 'URL3',
likes: 3}
  
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title:'000',
    author:'000',
    url:'000',
    likes:0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,nonExistingId, blogsInDb,
    usersInDb,
  }