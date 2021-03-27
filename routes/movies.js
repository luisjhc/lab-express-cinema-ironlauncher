const express = require("express");
const Movie = require("../models/Movie.model");
const router = express.Router();
const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");

//Movies page
router.get("/", isLoggedMiddleware, (req, res, next) => {
  if(req.session.user) {
    Movie.find({}).then((allMovies) => {
      //console.log("all the movies: ", allMovies);
      res.render("movies", {allMovies});
    });
  }
})

//Movie Details page
router.get("/:movieId", (req, res, next) => {
  if(!req.session.user) {
    res.redirect("/")
  }
    Movie.findOne({ _id: req.params.movieId }).then((movieDetails) => {
      //console.log("movie details: ", movieDetails);
      res.render("movie-details", {movieDetails});
    });
});

/* */

module.exports = router;