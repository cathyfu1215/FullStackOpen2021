const listHelper = require('../utils/list_helper')

describe('4.5favorate blog', () => {

   
    
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
    
   


    test('4.5return the blog with most likes ', () => {
        const result = listHelper.favoriteBlog(listWithThreeblogs)
        expect(result).toEqual(
            {
                title:"3",
                author:"3",
                likes:3

            })
      })

  })