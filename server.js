const express = require('express');

// express app
const app = express();

// registering view eng
app.set("view engine","ejs");
app.set("views","pages");
// listen for requests
app.listen(3000);

app.get("/", (req, res) => { //directs to index page. Makes sure path is always the say from current wd
    res.render("index",{title: "home"});
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