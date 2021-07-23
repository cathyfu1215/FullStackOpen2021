const listHelper = require('../utils/list_helper')

describe('4.4total likes', () => {

    const listWithNoBlog=[]

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithThreeblogs =[

        {
            _id: '1',
            title: '1',
            author: '1',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 1,
            __v: 0
          },
          {
            _id: '2',
            title: '2',
            author: '2',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 2,
            __v: 0
          },
          {
            _id: '3',
            title: '3',
            author: '3',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 3,
            __v: 0
          }
    ]
    
    test('4.4when list has nothing, likes equals 0', () => {
        const result = listHelper.totalLikes(listWithNoBlog)
        expect(result).toBe(0)
      })


    test('4.4when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })


    test('4.4when list has 3 blogs, equals the total likes ', () => {
        const result = listHelper.totalLikes(listWithThreeblogs)
        expect(result).toBe(6)
      })

  })