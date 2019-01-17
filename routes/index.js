const express = require("express");
const fetch = require("node-fetch");
const passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) return done(err);
      else {
        if (user) {
          User.verifyPassword(password, user.password, (err, result) => {
            if (err) return done(err);
            return done(null, user);
          });
        } else {
          return done(err);
        }
      }
    });
  })
);

router.get("/", function(req, res) {
  Post.findAll((err, posts) => {
    if (err) console.log(err);
    res.render("home", {
      title: "Homepage",
      posts: posts
    });
  });
});

router.get("/blog/:id", function(req, res) {
  res.send("test");
});

router.get("/login", (req, res) => {
  if (!req.user) {
    res.render("login", { layout: "login" });
  } else {
    res.redirect("/");
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: "Failed to login???",
    successFlash: "You've successfully logged in!",
    failureRedirect: "/login",
    successRedirect: "/"
  })
);
router.get("/register", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("register", { layout: "login" });
  }
});
router.post("/register", (req, res) => {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  User.create(user, () => {
    console.log(user);
    req.login(user, err => {
      if (err) console.log(err);
    });
    res.redirect("/");
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
router.get("/posts/add", (req, res) => {
  if (req.user) {
    res.render("addpost");
  } else {
    res.redirect("/login");
  }
});
router.post("/posts/add", (req, res) => {
  post = new Post();
  post.title = req.body.posttitle;
  post.body = req.body.postbody;

  Post.create(post, err => {
    if (err) console.log(err);

    res.redirect("/");
  });
});

module.exports = router; //export router for usage in /index
