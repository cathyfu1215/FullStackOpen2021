/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

require('dotenv').config()    //create environment variable. import before the Person model.
const express = require('express')
const app = express()
const Person = require('./models/Person')


app.use(express.static('build'))
app.use(express.json())


const cors = require('cors')
app.use(cors())

var morgan = require('morgan')

const morganFormat = (tokens, req, res) => {
  let format = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms'
  ]

  if (req.method === 'POST'||req.method === 'PUT') {
    format = format.concat(JSON.stringify(req.body))
  }

  return format.join(' ')
}

app.use(morgan(morganFormat))


app.get('/', (request, response) => {
  response.send('<h1>This is the front page of the Phonebook.</h1>')
})



app.get('/api/persons', (request, response,next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch((error) => next(error))
})

app.get('/info', (request, response,next) => {

  const time = new Date()

  Person.countDocuments({}, (error,count) => {
    response.json({ info: `Phonebook contains ${count} people,`, time })
  })
    .catch((error) => next(error))
})






app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id).then(person => {

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


// if name is found duplicated, front-end tells to "PUT", so this method is run.

app.put('/api/persons/:id',(request,response,next) => {
  const body=request.body

  const person={
    name:body.name,
    number:body.number
  }

  Person.findByIdAndUpdate(request.params.id,person,{ new:true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))


})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(request.body)

  if (body=== undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name:body.name,
    number:body.number,
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler) //this has to be the last loaded middleware

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})