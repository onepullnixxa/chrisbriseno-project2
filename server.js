// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config();



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

// ROUTES + CONTROLLERS
const PostsController = require("./controllers/postroute.js");
app.use('/home', PostsController);

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("express is listening on:", PORT));
