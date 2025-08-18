const http = require("http"); 
const fs = require("fs");

const server = http.createServer((req,res) =>{
    console.log(req.url,req.method)
    
    res.setHeader("Content-Type", "text/html");
//sendiing a html file id like to read
  // routing
    let path = './pages/';
    switch(req.url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/aboutme':
      path += 'aboutme.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/aboutme');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

    fs.readFile(path,(err,data)=>{
    if (err){
        console.log(err);
        res.end();

        }
    else{
        res.end(data);
    }
})
});



server.listen(3000,"localhost",()=>{
    console.log("Listening for requests on port 3000")
});