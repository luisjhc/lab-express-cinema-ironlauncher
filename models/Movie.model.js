const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
  },
  stars: {
    type: [String],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  showtimes: {
    type: [String],
  },
  imageUrl: {
    type: String,
  }
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
