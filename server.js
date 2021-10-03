// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config();

const Post = require('./models/posts.js');

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it

// DATABASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// DATABASE CONNECTION ERROR/SUCCESS
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongodb connected: "));
db.on("disconnected", () => console.log("mongob disconnected"));

// INDEX ROUTE
app.get("/home", (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render('index.ejs', {
      posts: allPosts,
    });
  });
});

// NEW ROUTE
app.get('/home/new', (req, res) => {
  res.render('new.ejs');
});

// DELETE ROUTE
app.delete('/home/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/home');
  });
});

// UPDATE ROUTE
app.put('/home/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (error, updatedPost) =>
    res.redirect(`/home/${req.params.id}`));
});

// CREATE ROUTE
app.post('/home', (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    res.redirect('/home');
  });
});

// EDIT ROUTE
app.get('/home/:id/edit', (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render('edit.ejs', {
      post: foundPost
    });
  });
});

// SHOW ROUTE
app.get('/home/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
    res.render('show.ejs', {
      post: foundPost,
    });
  });
});


// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("express is listening on:", PORT));
