require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const Meal = require('./models/meal');


const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

const loginLimiter = new RateLimit({
  windowMs: 5*60*1000,
  max: 3,
  delayMs: 0,
  message: "Maximum login attempts exceeded!"
})
const signupLimiter = new RateLimit({
  windowMs: 60*60*1000,
  max: 3,
  delayMs: 0,
  message: "Maximum accounts created. Please try again later."
})



mongoose.connect('mongodb://localhost/jwtAuth', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n ${err}`);
});


mongoose.connect('mongodb://localhost/nutri_facts-2');

app.get('/meals', (req,res) => {
    Meal.find({}, function(err,meals){
        if (err) res.json(err)
        res.json(meals)
    })
    
})

app.get('meals/:id', (req,res) => {
    Meal.findById(req.params.id), function(err, meals) {
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


app.put("/meals/:id", (req,res) => {
    Meal.findByIdAndUpdate(req.params.id, {
        food: req.body.food,
        dish: req.body.dish,
        type: req.body.type,
        date: req.body.date,
        nutrition: req.body.nutrition
    }, {
        new: true
    }, (err, meals) =>  {
        res.json(meals);
    });
    });


      app.delete("/meals/:id", (req,res) => {
        Meal.findByIdAndRemove(req.params.id, function(err){
            if (err) {
              res.json(err);
            }
            res.json({message: "Delete"})
        })
    })
      



// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.listen(process.env.PORT, () => {
  console.log('🖲🖲🖲 server connected to port ' + process.env.PORT || 3001);
})