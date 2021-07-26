import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render , fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content and hide the detail', () => {
  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:666
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'test title'
  )
  expect(component.container).toHaveTextContent(
    'test author'
  )
  expect(component.container).toHaveTextContent(
    'test url'
  )
  expect(component.container).toHaveTextContent(
    666
  )


  // detail is hidden when no button clicked
  const div1 = component.container.querySelector('.detail')
  expect(div1).toHaveStyle('display: none')
})

test('after clicking the view button, show detail',() => {

  const blog = {
    title:'test title',
    author:'test author',
    url:'test url',
    likes:666
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.detail')
  expect(div).not.toHaveStyle('display: none')
})

