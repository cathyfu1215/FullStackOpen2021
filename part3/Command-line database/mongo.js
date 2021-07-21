/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ecoiq.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name:   String,
  number: String

})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Person = mongoose.model('Person', personSchema)



if (process.argv.length < 4){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.Name,person.Number)
    })
    mongoose.connection.close()
  })
}

else{
  const person = new Person({
    Name:   name,
    Number: number
  })

  person.save().then(result => {
    console.log(`Added ${name} number ${number} to the phonebook.`)
    mongoose.connection.close()
  })
}