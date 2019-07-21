const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    food: String,
    dish: String,
    type: String,
    date: Date,
    nutrition: []
  });
  
  module.exports = mongoose.model('Meal', mealSchema);