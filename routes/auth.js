const express = require('express');
const router = express.Router();
const User = require('../models/user'); //class from schema
const jwt = require('jsonwebtoken');

// Route for signup, only send back token to front
router.post('/signup', (req, res) => {
  // see if the email is already in the db\
  User.findOne({email: req.body.email}, (err, user) => {
    if (user)  {
      // if yes, return an err
      res.json({
        type: 'error',
        message: 'Email already exists'
      })
    } else {
      // if no, create the user
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      user.save((err, user) => {
        if (err) {
          res.json({type: 'error', message: 'Data error creating user', err})
        } else {
          // sign a token (this is the login step)
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: '1d'
          }); //?toObject() defined in user model
          // send the token to front (res.json, browser store the token)
          res.status(200).json({type:'success', user: user.toObject(), token});
        }
      })
    }
  })
})


//Route for login
router.post('/login', (req, res) => {
  // find user in db by email
  User.findOne({email: req.body.email}, (err, user) => {
    // if there is no user, return an error
    if (err) res.json({type: 'error', message: 'invalid user or password'})
    // if user, check authentication
    if (user.authenticate(req.body.password, user.password)) {
      // if authenticated, sign a token (login)
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
      // return the token to browser
      res.json({type: 'success', user: user.toObject(), token});
    } else {
      // wrong password
      res.json({type: 'error', message: 'invalid user or password!'})
    }
  })
})


//Route for validating tokens
router.post('/me/from/token', (req, res) => {
  // make sure then send us a token to check
  var token = req.body.token;
  if (!token) {
    // if no token, return an error
    res.json({type: 'error', message: "You must submit a valid token"});
  } else {
    // if token, verify it
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // if token, invalid, return an error
      if (err) res.json({type: 'error', message: 'Invalid token. Please login again.'})
      // if token is valid, look up user in the db
      User.findById(user._id, (err, user) => {
        if (err) {
          // if user doesn't exist, return an error
          res.json({type: 'error', message: 'Database error during validation'})
        } else {
          res.json({type: 'success', user: user.toObject(), token})
        }
      } )

    })
  }
  // if user exists, send back user and token
})


module.exports = router;