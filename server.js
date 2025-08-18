const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => { //directs to index page. Makes sure path is always the say from current wd
  res.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/aboutme', (req, res) => {
  res.sendFile('./pages/aboutme.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});