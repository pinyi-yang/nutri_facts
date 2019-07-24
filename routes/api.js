const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const axios = require('axios');
const async = require('async');
const User = require('../models/user');

router.post('/', (req, res) => {
  let {foodsArr, dishesArr} = req.body;

  //? axios all method, not working
  // console.log('get to backend', foodsArr, dishesArr); passed
  // let getFoods = foodsArr.map(food => (
  //   function () {
  //     return axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${food}&app_id=3ca2898f&app_key=cbab023867dfdece8499c75828decc2fs`)
  //   }
  // ))
  // let getDishes = dishesArr.map(dish => {
  //   axios.get(`https://api.edamam.com/search?q=${dish}&app_id=30824d48&app_key=abe53731cba05bdc4a895e8aafc00067`)
  // })
  // axios.all(getFoods).then(function(foods) {
  //   console.log('get foods from api', foods);
  //   res.json({type: 'success', message: 'You access the protected API route'});

  // })

  //? async concat method
  // axios.get('https://api.edamam.com/api/food-database/parser?ingr=peach&app_id=8937c5c8&app_key=68d019c031e2c4ef6c41a5193695a7b9').then(function(peach) {
  //   console.log(peach.data);
  // })
  let getFood = function(url, cb) {
    axios.get(url).then(function(food) {
      cb(null, food.data)
    })
  }
  let foodsAPIUrls = foodsArr.map(food => (
    `https://api.edamam.com/api/food-database/parser?ingr=${food}&app_id=8937c5c8&app_key=68d019c031e2c4ef6c41a5193695a7b9`
  ))
  console.log('prepare fns to get foods and dishes from API', foodsAPIUrls);
  async.concat(foodsAPIUrls, getFood, function(err, foodsdata) {
    // console.log('get foods from API', foodsdata); passed
    let foods = foodsdata.map(food => (
      {
        name:food.text,
        apiId: food.parsed[0].food.foodId,
        nutrients: food.parsed[0].food.nutrients,
        image: food.parsed[0].food.image
      }
    ))
    console.log(foods[0]);
    res.json(foods)
  })
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
  console.log('get to back end to add meal');
  Meal.create({
    food: req.body.newmeal,
    dish: [],
    type: req.body.newmeal[0].type,
    date: new Date(),
    nutrition: {}
    }, (err, meal) => {
    User.findById(req.params.uid, (err, user) => {
      user.meals.push(meal._id);
      user.save();
      res.json(user);
      })
    })
})


module.exports = router;