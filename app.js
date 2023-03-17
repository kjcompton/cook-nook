const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: false,
})

const PORT = process.env.PORT

const db = mongoose.connection
db.on('error', (err) => console.log(`${err.message} MongoDB Not Running!`))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))

const recipesController = require('./controllers/recipes.js')
//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public'));



//HOME
app.get('/', (req, res) => {
    res.send('Home')
})

app.use('/recipes', recipesController)



app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})