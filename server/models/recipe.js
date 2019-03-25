const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipesSchema = new Schema({
  ingredients: [String],
  instructions: [String],
  totalTime: String,
  imageURL: String,
  url: {
    hostname: String,
    href: String,
    link: String,
  },
  title: String,
  created: { type: Date, default: Date.now },
  processable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Recipe', RecipesSchema);
