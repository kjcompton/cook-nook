const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes.js')
const recipeSeed = require('../models/seed.js')


//INDEX
router.get('/', (req, res) => {
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
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//DELETE
router.delete('/:id', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    if (req.body.one_pot === 'on') {
        req.body.one_pot = true
    } else {
        req.body.one_pot = false
    }
    if (req.body.sheet_pan === 'on') {
        req.body.sheet_pan = true
    } else {
        req.body.sheet_pan = false
    }
    if (req.body.quick_and_easy === 'on') {
        req.body.quick_and_easy = true
    } else {
        req.body.quick_and_easy = false
    }
    if (req.body.limited_ingredients === 'on') {
        req.body.limited_ingredients = true
    } else {
        req.body.limited_ingredients = false
    }
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})

//CREATE
router.post('/', (req, res) => {
    if (req.body.one_pot === 'on') {
        req.body.one_pot = true
    } else {
        req.body.one_pot = false
    }
    if (req.body.sheet_pan === 'on') {
        req.body.sheet_pan = true
    } else {
        req.body.sheet_pan = false
    }
    if (req.body.quick_and_easy === 'on') {
        req.body.quick_and_easy = true
    } else {
        req.body.quick_and_easy = false
    }
    if (req.body.limited_ingredients === 'on') {
        req.body.limited_ingredients = true
    } else {
        req.body.limited_ingredients = false
    }
    Recipe.create(req.body, (err, createdRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/recipes')
        }
    })
})

//EDIT
router.get('/:id/edit', (req, res) => {
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
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) {
            console.log(err)
        } else {
            res.render('show.ejs', {
                recipe: foundRecipe
            })
        }
    })
})

    // Recipe.create(recipeSeed, (err, data) => {
    // if (err) { 
    //     console.log(err.message)
    // } else {
    //     console.log('Added recipes')
    // }
    // })

module.exports = router