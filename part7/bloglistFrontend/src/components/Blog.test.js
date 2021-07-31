import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import Blog from './Blog'
import 'jest'


//add blog, hard code the user
//it seems tokens are not necessary here
//then test


test('5.13 renders content and hide the detail', () => {

  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:666,
    user:{ username:'test user' }

  }
  const user ={ username:'test user' }

  const component = render(<Blog blog={blog} user={user}/>)

  expect(component.container).toHaveTextContent('test title')
  expect(component.container).toHaveTextContent('test author')
  expect(component.container).toHaveTextContent('test url')
  expect(component.container).toHaveTextContent(666)


  // detail is hidden when no button clicked
  const div1 = component.container.querySelector('.detail')
  expect(div1).toHaveStyle('display: none')
})

test('5.14 after clicking the view button, show detail',() => {
  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:666,
    user:{ username:'test user' }
  }

  const user ={ username:'test user' }

  const component = render(<Blog blog={blog} user={user} />)


  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.detail')
  expect(div).not.toHaveStyle('display: none')
})

test('5.15 clicking the like button twice calls event handler twice', () => {

  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:666,
    user:{ username:'test user' }
  }

  const user ={ username:'test user' }


  const mockHandler = jest.fn()
  const component = render(<Blog blog={blog} user={user} setSuccessMessage={mockHandler}/>)


  //show the detail of a blog , hense show the like button
  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls).toHaveLength(2)
  //since setSuccessMessage will be called only after likeBlog is called, I use setSuccessMessage to track the like action.
})

