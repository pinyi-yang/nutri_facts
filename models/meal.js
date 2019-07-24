const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    food: [],
    dish: [],
    type: String,
    date: Date,
    nutrition: {}
  });

module.exports = mongoose.model('Meal', mealSchema);

