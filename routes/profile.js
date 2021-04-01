const express = require("express");

const router = express.Router();
const isLoggedMiddleware = require("../middlewares/MustBeLoggedIn");
const User = require ("../models/User.model");

router.get("/", isLoggedMiddleware, (req, res) => {
  res.render("profile", {user: req.session.user});
});

router.get("/edit", isLoggedMiddleware, (req, res) => {
  res.render("edit-profile", {user: req.session.user});
});

router.post("/edit", isLoggedMiddleware, (req, res) => {
  const {name, bio} = req.body;

  User.findByIdAndUpdate(
    req.session.user._id, 
    {name, shortBio: bio},
    {new: true}
  ).then((newUser) => {
    req.session.user = newUser;
    res.redirtect("/profile");
  });
});

router.get("/dark-mode", isLoggedMiddleware, (req, res) => {
  User.findByIdAndUpdate(
    req.session.user._id,
    {prefersDarkMode: !req.session.user.prefersDarkMode,},
    {new: true}
  ).then((updatedUser) => {
    req.session.user = updatedUser;
    res.redirect("/profile");
  });
});

module.exports = router;