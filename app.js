const express = require('express')
const app = express()
const methodOverride = require('method-override')
require('dotenv').config()

const PORT = process.env.PORT
const mongoose = require('mongoose')
const db = mongoose.connection
const mongoURI = 'mongodb://localhost:27017/recipe'

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public'));

mongoose.connect(mongoURI, () => {
    console.log('The connection with mongod is established')
})

const Recipe = require('./models/recipes.js')
//HOME
app.get('/', (req, res) => {
    res.send('Home')
})
//INDEX
app.get('/recipes', (req, res) => {
    Recipe.find({}, (err, allRecipes) => {
        if (err) {
            console.log(err)
        } else {
            res.render('index.ejs', {
                recipes: allRecipes
            })
        }
    })
})
//NEW
app.get('/recipes/new', (req, res) => {
    res.render('new.ejs')
})
//DELETE
app.delete('/recipes/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})
//UPDATE
app.put('/recipes/:id', (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})
//CREATE
app.post('/recipes', (req, res) => {
    Recipe.create(req.body, (err, createdRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})
//EDIT
app.get('/recipes/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err) 
        } else {
            res.render('edit.ejs', {
                recipe: foundRecipe
            })
        }
    })
})
//SHOW

//SEED
const recipeSeed = [
    {
        name: 'Test Name',
        description: 'Test Description'
    }
]
app.get('/recipes/seed', (req, res) => {
    Recipe.create(recipeSeed, (err, data) => {
    if (err) console.log(err.message)
    console.log('Added Recipes')
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})