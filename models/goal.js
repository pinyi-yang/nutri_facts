const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  calories: Number,
  fat: Number,
  protein: Number,
  fiber: Number
  });

  module.exports = mongoose.model('Goal', goalSchema);