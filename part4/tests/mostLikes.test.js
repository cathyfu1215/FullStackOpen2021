const listHelper = require('../utils/list_helper')

describe('4.7 most Likes',()=>{

const blogList=[
    {
        _id: '1',
        title: '1',
        author: 'author1',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
      },
      {
        _id: '2',
        title: '2',
        author: 'author2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      },
      {
        _id: '3',
        title: '3',
        author: 'author2',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      },
      {
        _id: '4',
        title: '4',
        author: 'author3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      },
      {
        _id: '5',
        title: '5',
        author: 'author3',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 1,
        __v: 0
      }
]

test('4.7 return author with most likes and its blog number',()=>{

    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual(
        {
            
            author:"author2",
            likes:5

        })



}) 


})