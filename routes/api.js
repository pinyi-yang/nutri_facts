const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');

router.get('/', (req, res) => {
  let {foodsarr, dishesarr, type} = req.body;
  console.log('get to backend', foodsarr, dishesarr, type);
  res.json({type: 'success', message: 'You access the protected API route'});
});

router.get('/meals', (req,res) => {
  Meal.find({}, function(err,meals){
      if (err) res.json(err)
      res.json(meals)
  })

})

router.get('meals/:id', (req,res) => {
  Meals.findById(req.params.id, (err, meals) => {
  if (err) {
      res.json(err)
  }
  res.json(meals)
  })
});


router.post('/users/:uid/meals', (req,res) => {

  Meal.create({
    food: req.body.food,
    dish: req.body.dish,
    type: req.body.type,
    date: req.body.date,
    nutrition: req.body.nutrition 
    }, (err, meal) => {
    User.findById(req.params.uid, (err, user) => {
      user.meals.push(meal._id);
      user.save();
      res.json(user);
      })
    })
})


module.exports = router;