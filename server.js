const http = require("http"); 

const server = http.createServer((request,response)=>{
    console.log("Request made.")
}); //everytime a request is made this function is called

server.listen(3000,"localhost",()=>{
    console.log("Listening for requests on port 3000")
});