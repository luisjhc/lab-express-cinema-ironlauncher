const express = require("express");
const Movie = require("../models/Movie.model");
const router = express.Router();

//Movies page
router.get("/", (req, res, next) => {
  Movie.find({}).then((allMovies) => {
    //console.log("all the movies: ", allMovies);
    res.render("movies", {allMovies});
  });
})

//Movie Details page
router.get("/:movieId", (req, res) => {
  Movie.findOne({ _id: req.params.movieId }).then((movieDetails) => {
    //console.log("movie details: ", movieDetails);
    res.render("movie-details", {movieDetails});
  });
});

module.exports = router;