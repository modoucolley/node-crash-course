const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');



const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://<>:<>@cluster0.hccy1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(result => app.listen(3000))
        .catch(err => console.log(err));

// register view engine

app.set('view engine', 'ejs');


//Middle ware

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });
  
  app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
  });


  app.use(morgan('dev'));

// listen for requests

//app.listen(3000);

/* app.get('/',(req, res)=>{

    res.send('<h1>Hello Ninjas</h1>');
});

app.get('/about',(req, res)=>{

    res.send('<h1>About Ninjas</h1>');
}); */


/* app.get('/',(req, res)=>{

    res.sendFile('./views/index.html', {root: __dirname});
});



app.get('/about',(req, res)=>{

    res.sendFile('./views/about.html', {root: __dirname});
});
 */


// redirects

/* app.get('/about-me',(req, res)=>{

    res.redirect('/about');
});

// 404
app.use((req, res) => {

    res.sendFile('./views/404.html', {root: __dirname});

})
 */

/* 
app.get('/',(req, res)=>{

    res.render('index', {});
}); */



// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
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


  app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  
  app.get('/single-blog', (req, res) => {
    Blog.findById('61e58425dd2838909ec46d18')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });



  // main routes

/* app.get('/', (req, res) => {
    const blogs = [
      {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs });
  }); */

  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });

  app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/about',(req, res)=>{

    res.render('about',  { title: 'About' });
});

app.get('/about-us',(req, res)=>{

    res.redirect('/about', { title: 'Create a new blog' });
});


// blog routes


app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

// 404
app.use((req, res) => {

    res.status(404).render('404', { title: '404' });

})