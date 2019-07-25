require('dotenv').config()
const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const axios = require('axios');
const async = require('async');
const User = require('../models/user');
const moment = require('moment');

router.post('/', (req, res) => {
  let {foodsArr, dishesArr} = req.body;

  //? axios all method, not working
  // console.log('get to backend', foodsArr, dishesArr); passed
  // let getFoods = foodsArr.map(food => (
  //   function () {
  //     return axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${food}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
  //   }
  // ))
  // let getDishes = dishesArr.map(dish => {
  //   axios.get(`https://api.edamam.com/search?q=${dish}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`)
  // })
  // axios.all(getFoods).then(function(foods) {
  //   console.log('get foods from api', foods);
  //   res.json({type: 'success', message: 'You access the protected API route'});

  // })

  //? async concat method
  // axios.get('https://api.edamam.com/api/food-database/parser?ingr=peach&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}').then(function(peach) {
  //   console.log(peach.data);
  // })
  let getFood = function(url, cb) {
    axios.get(url).then(function(food) {
      cb(null, food.data)
    })
  }
  let foodsAPIUrls = foodsArr.map(food => (
    `https://api.edamam.com/api/food-database/parser?ingr=${food}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
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

//get meals?start=&end=   date format 'YYYY-MM-DD'
router.get('/users/:id/meals', (req,res) => {
  let startDate = moment(req.query.start, 'YYYY-MM-DD').startOf('day');
  let endDate = moment(req.query.end, 'YYYY-MM-DD').endOf('day');
  console.log(startDate, endDate);
  User.findById(req.params.id)
  .populate({
    path: 'meals',
    match: {date: {$gt: startDate,$lt: endDate}}
  }).exec( (err, user) => {
    if (err) {
    res.json(err)
    }
    //!!! don't pass user out here. password will be included
    res.json(user.meals);
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
    type: req.body.type,
    date: moment(),
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