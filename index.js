const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Meal = require('./models/meal');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://localhost/nutri_facts-2');

app.get('/meals', (req,res) => {
    Meal.find({}, function(err,meals){
        if (err) res.json(err)
        res.json(meals)
    })
    
})

app.get('meals/:id', (req,res) => {
    Meals.findById(req.params.id), (err, meals) => {
    if (err) {
        res.json(err)
    }
    res.json(meals)
 }
})


app.post('/meals', (req,res) => {
    Meal.create({
    food: req.body.food,
    dish: req.body.dish,
    type: req.body.type,
    date: req.body.date,
    nutrition: req.body.nutrition 

    }, function(err, meals) {
        res.json(meals)
  })
})


app.listen(3000, () => {
    console.log("Listening")
    });
    