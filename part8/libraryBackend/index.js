const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

require('dotenv').config()

const mongoose = require('mongoose')
const Book =require('./schema/BookSchema')
const Author=require('./schema/AuthorSchema')
const User=require('./schema/UserSchema')

const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })




const typeDefs = gql`

type Subscription {
  bookAdded: Book!
  
}    

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Book {
      title:String!
      published:Int!
      author:Author!
      genres:[String!]!
      id:ID!
  }

  type Author{
      name:String
      born:Int
      bookCount:Int
      id:ID!
      
      
  }

  type Query {
      bookCount:Int!
      authorCount:Int!
      allBooks(genre:String):[Book]
      allAuthors:[Author!]!
      me: User
  
  }

  type Mutation{

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addBook
    (
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    ):Book

    editAuthor
    (
      name:String!
      setBornTo:Int!
    ):Author
  }
`

const resolvers = {
  Query: {
      bookCount:()=>Book.collection.countDocuments(),
      authorCount:()=>Author.collection.countDocuments(),
      

      
      allBooks:async (root, args)=>{

       if(args.genre){
         const books=await Book.find({genres:args.genre}).populate('author')
       
       
         return books }

       else {
         const books=await Book.find({}).populate('author')
         
        return books}
      
      },


      allAuthors:()=>Author.find({}),

      me:(root, args, context) => {
        
        return context.currentUser
      },

      
      
  },
  
  

  

  Mutation:{
    createUser:  (root, args) => {
      const user = new User({username: args.username , favoriteGenre:args.favoriteGenre})
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },


    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
       return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      

    },

 
    addBook:async (root,args,context)=>{
      if(context.currentUser){
      
     const targetAuthor= await Author.findOne({name:args.author})

      if((targetAuthor!==null)&&(targetAuthor!==undefined)){
        
       
      await Author.findOneAndUpdate({"name":args.author},{$inc:{"bookCount":1}})

        const newBook=new Book({
          title:args.title,
          author:targetAuthor,
          published:args.published,
          genres:args.genres
        })

        console.log(`New book created. 
        Existed author ${targetAuthor.name}'s bookCount increased by one.`)
        
        try {
          await newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
      }

      // if author is new, add the book and the author, set the bookCount to 1. 
      else{


        const newAuthor= new Author({
          name:args.author,
          born:null,
          bookCount:1
        })

        try {
          await newAuthor.save()
          console.log(`${newAuthor.name} is saved.bookCount is ${newAuthor.bookCount}`)
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        
        

        const newBook=new Book({
          title:args.title,
          author:newAuthor,
          published:args.published,
          genres:args.genres
        })

        console.log(`New book created. New author ${newAuthor.name} added.`)
        
        try {
          await newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
        }

      }
    },



      editAuthor: async (root,args,context)=>{

        if(context.currentUser){
        const author =await Author.findOne({name:args.name})
        author.born=args.setBornTo
        

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      
      
      }
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
  

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return  {currentUser}
    }
  }
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})