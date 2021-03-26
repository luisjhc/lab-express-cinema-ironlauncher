const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const saltRounds = 10;

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const {username, email, password} = req.body;

  if (!username || !email) {
    res.render("signup", { errorMessage: "Please fill out all the fields"});
    return;
  }

  if (password.length < 8) {
    res.render("signup", {errorMessage: "Password needs to be at least 8 characters long"});
    return;
  }

  //console.log("req.body:", req.body);
  User.findOne({ $or: [{ username }, { email }]})
    .then((found) => {
      if (found) {
        res.render("signup", {errorMessage: "Oops, username/email already taken"});
        return;
      }

      const generatedSalt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, generatedSalt);
      User.create({ username, email, password: hashedPassword})
      .then((createdUser) => {
        console.log("createdUser:", createdUser);
        req.session.user = createdUser;
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("signup", {errorMessage: "Something went wrong"});
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { usernameOrEmail, password} = req.body;

  User.findOne({ $or: [{ username: usernameOrEmail }, {email: usernameOrEmail }]})
  .then((found) => {
    if(!found) {
      res.render("login", { errorMessage: "Wrong credentials" });
      return;
    }

    const isSamePassword = bcrypt.compareSync(password, found.password);
    if(!isSamePassword) {
      console.log(password)
      res.render("login", { errorMessage: "Wrong Credentials" });
      return;
    }

    req.session.user = found;
    res.redirect("/");
  });
});

module.exports = router;