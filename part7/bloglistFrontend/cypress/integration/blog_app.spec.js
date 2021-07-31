describe('5.17-5.19 Blog tests', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('5.17 Login form is shown', function() {
    cy.contains('User Login')
  })

  it('5.18 Login can success with right credentials', function() {
    //testing the login process fully
    cy.contains('User Login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen , logged-in')
  })

  it('5.18 Login fail with wrong credentials', function() {
    cy.contains('User Login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credential')
  })
  it('5.19 Logged in user can create a new blog', function() {
    cy.contains('User Login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen , logged-in')

    cy.contains('new blog').click()
    cy.get('#newBlogTitle').type('blog1')
    cy.get('#newBlogAuthor').type('author1')
    cy.get('#newBlogUrl').type('url1')
    cy.get('#newBlogLikes').type(1)

    cy.get('#save-blog').click()
    cy.contains('Title:blog1')
  })
})

describe('5.20-5.51 Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    //below is bypassing the UI and doing a backend login, saving the token to the browser
    cy.request('POST', 'http://localhost:3000/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })

    //add one blog
    cy.contains('new blog').click()
    cy.get('#newBlogTitle').type('blog1')
    cy.get('#newBlogAuthor').type('author1')
    cy.get('#newBlogUrl').type('url1')
    cy.get('#newBlogLikes').type(1)

    cy.get('#save-blog').click()
    cy.contains('Title:blog1')
  })

  it('5.20 User can like a blog', function() {
    cy.contains('blog1')
      .get('#viewOrHide')
      .click()
      .get('#like-blog')
      .click()

    cy.contains('Likes:2')
  })
  it('5.21 Creator of the blog can delete it', function() {
    cy.contains('blog1')
      .get('#viewOrHide')
      .click()
      .get('#delete-blog')
      .click()

    cy.contains('Deleted blog:blog1')
  })



})

describe('5.22 Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)


    cy.request('POST', 'http://localhost:3000/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })

    //below I add 3 blogs with acending like numbers
    cy.contains('new blog').click()
    cy.get('#newBlogTitle').type('blog1')
    cy.get('#newBlogAuthor').type('author1')
    cy.get('#newBlogUrl').type('url1')
    cy.get('#newBlogLikes').type(1)

    cy.get('#save-blog').click()
    cy.contains('Title:blog1')

    cy.contains('new blog').click()
    cy.get('#newBlogTitle').type('blog2')
    cy.get('#newBlogAuthor').type('author2')
    cy.get('#newBlogUrl').type('url2')
    cy.get('#newBlogLikes').type(2)

    cy.get('#save-blog').click()
    cy.contains('Title:blog2')

    cy.contains('new blog').click()
    cy.get('#newBlogTitle').type('blog3')
    cy.get('#newBlogAuthor').type('author3')
    cy.get('#newBlogUrl').type('url3')
    cy.get('#newBlogLikes').type(3)

    cy.get('#save-blog').click()
    cy.contains('Title:blog3')

  })

  it('5.22 Blogs are ordered by likes, descending', function() {
    cy.get('#viewOrHide:first').click()
    cy.contains('url3')

    cy.get('#viewOrHide:last').click()
    cy.contains('url1')
  })
})