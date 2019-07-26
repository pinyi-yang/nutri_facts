require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const User = require('./models/user')
const Meal = require('./models/meal');
const axios = require('axios');
const Goal = require('./models/goal')


const app = express();

app.use(express.static(__dirname + '/client/build'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// const loginLimiter = new RateLimit({
//   windowMs: 5*60*1000,
//   max: 30,
//   delayMs: 0,
//   message: "Maximum login attempts exceeded!"
// })
// const signupLimiter = new RateLimit({
//   windowMs: 60*60*1000,
//   max: 30,
//   delayMs: 0,
//   message: "Maximum accounts created. Please try again later."
// })



// mongoose.connect('mongodb://localhost/jwtAuth', {useNewUrlParser: true});
mongoose.connect(process.env.MONGODB_URI); //deploy setup
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n ${err}`);
});

// mongoose.connect('mongodb://localhost/nutri_facts-2');

app.get('/users', (req,res) => {
  User.find({}, function(err,users){
      if (err) res.json(err)
      res.json(users)
  })
  
})

app.post('/users', (req,res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
}, function(err, user) {
      res.json(user)
})
})



app.post("/users/:id", (req,res) => {
  User.findById(req.params.id, function(err, user) {
      user.save( function(err) {
      user.push({meal})
          res.json(user)
      })
  })
})



app.post("/users/:uid/meals", (req,res) => {
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
  });



app.delete("/users/:uid/meals/:mid", (req,res) => {
  User.findById(req.params.uid, (err, user) => {
    user.meals.pull(req.params.mid)
    user.save( err => {
      if (err) res.json(err)
      Meal.deleteOne({_id: req.params.mid}, err => {
      if (err) res.json(err)
      res.json(1);
        })
      })
    })
})

app.get('/meals', (req,res) => {
    Meal.find({}, function(err,meals){
        if (err) {
        res.json(err)
        }
        res.json(meals)
    })
    
})


app.get('/meals/:mid', (req,res) => {
    Meal.findById(req.params.id, function(err, meals) {
        if (err) {
        res.json(err)
        }
        res.json(meals)
    })
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

// creates goal for a specific user
app.post('/user/:uid/goals', (req,res) => {
  User.findById(req.params.uid).populate('goals').exec( (err, user) => {
    if (err) {
      res.json(err);
    }
    var {calories, fat, protein, fiber, carbs} = req.body
    Goal.create({calories, fat, protein, fiber, carbs}, function(err, goal) {
      user.goals.push( goal );
      console.log(user);
      user.save();
      res.json(user);
    })

    })
})


  
// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(process.env.PORT, () => {
  console.log('🖲🖲🖲 server connected to port ' + process.env.PORT || 3001);
})