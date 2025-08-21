const express = require("express");
require("dotenv").config(); // for my secret files shh
const morgan = require("morgan");
const mongoose = require("mongoose");
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
// listen for requests


app.get("/", (req, res) => { //directs to index page. Makes sure path is always the say from current wd
    const blogs = [{title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
    
    res.render("index",{title: "home", blogs});
});

app.get("/aboutme", (req, res) => {
  res.render("aboutme",{title:"About Me"});
});

app.get("/create", (req, res)=>{
    res.render("create", {title:"Create New post"});
})

// 404 page
app.use((req, res) => { //assumes error code. checks if the status is 404. shows the rror page
  res.status(404).render("404", {title:"404"});})

//express is so cool