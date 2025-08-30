const express = require("express");
require("dotenv").config(); // for my secret files shh
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./modules/blog");
const usrlogin = require("./modules/usrlogin");
const emaillist = require("./modules/emaillist")
const bcrypt = require("bcrypt");
let logged_in = 0;
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


app.get("/login", (req, res)=>{
    res.render("login", {title:"Login!"});
});


// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await usrlogin.findOne({ name: req.body.username });
        if (!check) {
            res.send("<script> alert('Account does not exist.'); window.location.href = '/login'; </script>")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("<script> alert('Account does not exist.'); window.location.href = '/login'; </script>")        }
        else {
            res.render("create",{title:"Create!"});
            logged_in = 1;
        }
    }
    catch {
        window.alert("Error logging in.");
    }
});
app.get("/signup", (req, res)=>{
    res.render("signup", {title:"SignUp!"});
});

// Register User for email notifications later!
app.post("/signup", async (req, res) => {
    
    try {
        const data = {
            name: req.body.username,
            email: req.body.email,        
        };
            //return res.send(data); checking the state of the data :)
        // Check if the emails already exists in the database
        const existingEmail = await emaillist.findOne({ email: data.email });

        if (existingEmail) {
            res.send("<script> alert('Email address already being used. Please enter another.'); window.location.href = '/signup'; </script>")
        }
        // Create a new user instance
        const newUser = new emaillist({
            name: data.name,
            email: data.email,
        });
       // return res.send(newUser); checking user state

        // Save the new user
        const savedUser = await newUser.save();
        console.log(savedUser);
        console.log("Signup successful!");
        res.redirect('/blogs');

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during signup.");
    }
});

//adds the new blogs
app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
        res.render("create", { alertMessage: "Blog created!", title:"Create!" });   
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
    logged_in = 0;     
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});
//checks if logged in value is true
app.get("/delete", (req, res) => {
    if(logged_in ==1){
        Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('delete', { blogs: result, title: 'All blogs' });
         })
        .catch(err => {
            console.log(err);
        });}
    else{
        res.redirect("/blogs")};
});
app.get("/create", (req, res) => {
    if(logged_in ==1){
        res.render("create",{title:"Create!"});}
    else{
        res.redirect("/blogs")
    }
});
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.render("delete",{title:"Delete!"});
    })
    .catch(err => {
      console.log(err);
    });
});



// 404 page
app.use((req, res) => { //assumes error code. checks if the status is 404. shows the rror page
  res.status(404).render("404", {title:"404"});})

//express is so cool