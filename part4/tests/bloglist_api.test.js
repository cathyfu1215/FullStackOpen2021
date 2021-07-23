const mongoose = require('mongoose')
const supertest = require('supertest')

const helper=require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects =helper.initialBlogs.map(blog=>new Blog(blog))
  const promiseArray=blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})
//above is the initialization


describe('4.8 HTTP GET method and return in JSON method',()=>{
test('4.8Get all initial blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


test('4.8blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
})

describe ('4.9 blog post has identifier property id',()=>{
    test('first item of blogs has id property', async ()=>{
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('4.10 HTTP POST',()=>{


    test('4.10add a blog',async()=>{
        const newBlog={
        title: 'Blog4',
        author: 'Author4',
        url: 'URL4',
        likes: 4}

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response =await api.get('/api/blogs')

        const titles = response.body.map(r=>r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length +1)
        expect(titles).toContain('Blog4')

    })


    
})


describe ('4.11 blog with no likes property will default to zero',()=>{
    test('4.11blog with no likes property will default to zero', async ()=>{
        
    const blogWithNoLikes={
        title: 'Blog5',
        author: 'Author5',
        url: 'URL5'
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const response =await api.get('/api/blogs')

        const titles = response.body.map(r=>r.title)
        const blogLikes = response.body.map(r=>r.likes)

        expect(response.body).toHaveLength(helper.initialBlogs.length +1)
        expect(titles).toContain('Blog5')
        expect(blogLikes).toContain(0)

    })
})


describe('4.12 if title and url are missing, respond 400, do not add',()=>{

    test('4.12if title and url are missing, respond 400',async()=>{

            const newBlog = {
                
                author: 'Author6',
                likes: 6 }
            
          
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(400)  
          
              const blogsAtEnd = await helper.blogsInDb()
              expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
           
          

    },50000)
})


describe(' 4.13 view and delete a single blog',()=>{
 
  test('4.13 a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  
  test('4.13a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const contents = blogsAtEnd.map(r => r.title)
  
    expect(contents).not.toContain(blogToDelete.title)
  })

})


describe(' 4.14 update a single blog',()=>{
  test('4.14update a single blog, likes increased by 1', async ()=>{

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const oldlikes=blogToUpdate.likes

    const newBlog={
      title:blogToUpdate.title,
      author:blogToUpdate.author,
      url:blogToUpdate.url,
      likes:blogToUpdate.likes+1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)     
      .send(newBlog)
      .expect(200)
      
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(oldlikes+1)
  

  },30000)
})

describe('4.15when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('4.15creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('4.16 invalid username or password will not be added',()=>{
  test('4.16username less than 3 chars will not be added, code400',async()=>{

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'm',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

  })

  test('4.16password less than 3 chars will not be added, code 400',async()=>{
    
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 's',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)

      })


})

afterAll(() => {
  mongoose.connection.close()
})