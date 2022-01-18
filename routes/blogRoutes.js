
const express = require('express');
const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');
const router = express.Router();



router.get('/', blogController.blog_index);


  router.post('/', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

  router.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


  router.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  
  router.get('/single-blog', (req, res) => {
    Blog.findById('61e58425dd2838909ec46d18')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });


  router.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });


  module.exports = router;