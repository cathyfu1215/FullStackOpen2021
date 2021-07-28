
const config=require("./utils/config")
const express=require("express")
require('express-async-errors') //eliminate the try/catch block

const app = express()
const cors = require('cors')


const logger = require("./utils/logger")
const mongoose = require('mongoose')

const blogsRouter=require("./controllers/blogs")
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const tokenExtractor=require ('./utils/middleware').tokenExtractor




logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use("/api/blogs",blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/test')
    app.use('/api/testing', testRouter)
  }

const requestLogger=require('./utils/middleware').requestLogger
const unknownEndpoint=require('./utils/middleware').unknownEndpoint
const errorHandler=require('./utils/middleware').errorHandler

app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports= app