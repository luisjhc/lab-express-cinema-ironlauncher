const fileUploader = require('../config/cloudinary.config');
const express = require("express");
const Movie = require("../models/Movie.model");
const router = express.Router();
const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");

router.get("/", (req, res) => {
  res.render("create-movie");
});

router.post('/', fileUploader.single('image'), (req, res) => {
  const { title, description } = req.body;
 
  Movie.create({ title, description, image: req.file.path })
    .then(() => res.redirect('/movies'))
    .catch(error => console.log(`Error while creating a new movie: ${error}`));
});
 
module.exports = router;