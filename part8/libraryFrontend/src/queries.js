import { gql  } from '@apollo/client'

const BOOK_DETAILS=gql`
fragment BookDetails on Book{
  title
  author{name born bookCount}
  published
  genres}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `

  export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{name born bookCount}
      published
      genres
    }
  }
  
  `

  
  
  
  export const ADD_BOOK=gql `
  mutation ($title:String!,$author:String!, $published:Int! , $genres:[String!]!){ 
      addBook(
          title:$title,
          author:$author,
          published:$published,
          genres:$genres
          
      ){
          title
          author{name born bookCount}
          published
          
      }
  }
  
  `

  export const SET_BIRTHYEAR=gql`
  mutation editAuthor($name:String! ,$setBornTo:Int!){
      editAuthor(name:$name,setBornTo:$setBornTo){
          name
          born
          bookCount
          
      }
  }
  `
  export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query me{
   me{
     username
     favoriteGenre
   }
  }
`