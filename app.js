const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()

const PORT = process.env.PORT
const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = 'mongodb://localhost:27017/recipe'

const recipesController = require('./controllers/recipes.js')
//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public'));

mongoose.connect(mongoURI, () => {
    console.log('The connection with mongod is established')
})
db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


//HOME
app.get('/', (req, res) => {
    res.send('Home')
})

app.use('/recipes', recipesController)



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})