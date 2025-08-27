const express = require("express");
require("dotenv").config(); // for my secret files shh
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./modules/blog');
// express app
const app = express();
//connection string for mongodb stored in .env
const c_string = process.env.MONGO_URI;
// console.log("The string: ",c_string); 

//connecting to mongo db
mongoose.connect(c_string)// basically a try catch 
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));
// registering view eng
app.set("view engine","ejs");
app.set("views","pages");


//using morgan to log things and middlewares to load stles
app.use(morgan("dev")); //logs working
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'Second blog',
//     snippet: 'about my new blog',
//     body: 'more about my new blog'
//   })

//   blog.save()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get("/aboutme", (req, res) => {
  res.render("aboutme",{title:"About Me"});
});

app.get("/create", (req, res)=>{
    res.render("create", {title:"New Blog"});
});

//adds the new blogs
app.post('/blogs', (req, res) => {
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
//displaying each blog
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});
//retrieves all blogs
app.get('/blogs', (req, res) => { //sorts the blogs in order of creation
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
app.post


// 404 page
app.use((req, res) => { //assumes error code. checks if the status is 404. shows the rror page
  res.status(404).render("404", {title:"404"});})

//express is so cool