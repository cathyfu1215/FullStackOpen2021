const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors') 
app.use(cors())

app.use(express.static('build'))


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

  if (req.method === 'POST') {
    format = format.concat(JSON.stringify(req.body))
  }

  return format.join(' ')
} 

app.use(morgan(morganFormat))

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
]

app.get('/', (request, response) => {
  response.send('<h1>This is the front page of the Phonebook.</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people.<br/><br/>${Date()}</p>`)

})
  
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
      } else {                    //person can be "undefined"
        response.status(404).end()
      }


    response.json(person)  // view the single person
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })


 
  
  const generateId = () => {
    const largeId=Math.floor(Math.random() * 9999999); //generate intergers from 0 tp 999999
    return largeId
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!(body.name&&body.number)) {
      return response.status(400).json({ 
        error: 'name or number is missing' 
      })
    }

    else{

        if(persons.some(p=>p.name===body.name)){
            return response.status(400).json({ 
                error: 'Name must be unique!' 
        })}

        else{
  
            const person = {
            name: body.name,
            number:body.number,
            id: generateId()
            }
  
            persons = persons.concat(person)
  
            response.json(person)
        }}})

        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
})