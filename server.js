// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

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
  res.send("Hello World!");
});

// NEW ROUTE


// DELETE ROUTE


// UPDATE ROUTE


// CREATE ROUTE
app.post('/home', (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    res.send(createdPost);
  });
});

// EDIT ROUTE


// SHOW ROUTE

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("express is listening on:", PORT));
