const express = require('express');
const postRouter = express.Router();
const Post = require('../models/posts');

// INDEX ROUTE
postRouter.get("/", (req, res) => {
    Post.find({}, (error, allPosts) => {
      res.render('index.ejs', {
        posts: allPosts,
      });
    });
  });
  
  // NEW ROUTE
  postRouter.get('/new', (req, res) => {
    res.render('new.ejs');
  });
  
  postRouter.get('/about', (req, res) => {
    res.render('about.ejs');
  });

  postRouter.get('/shop', (req, res) => {
    res.render('shop.ejs');
  });

  postRouter.get('/connect', (req, res) => {
    res.render('connect.ejs');
  });


  // DELETE ROUTE
  postRouter.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/home');
    });
  });
  
  // UPDATE ROUTE
  postRouter.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (error, updatedPost) =>
      res.redirect(`/home/${req.params.id}`));
  });
  
  // CREATE ROUTE
  postRouter.post('/', (req, res) => {
    Post.create(req.body, (error, createdPost) => {
      res.redirect('/home');
    });
  });
  
  // EDIT ROUTE
  postRouter.get('/:id/edit', (req, res) => {
    Post.findById(req.params.id, (error, foundPost) => {
      res.render('edit.ejs', {
        post: foundPost
      });
    });
  });
  
  // SHOW ROUTE
  postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
      res.render('show.ejs', {
        post: foundPost,
      });
    });
  });

// EXPORTS
module.exports = postRouter;