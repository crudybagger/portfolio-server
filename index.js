let http = require('http');

let server = http.createServer((req,res) => {
    console.log("There was a request");
    switch(req.url){
        case "/" : {
            res.write("<h1>Hello World</h1>");
            res.end();
        }
    }
    // req.send("Hello World");
})

server.listen(3000, ()=>{
    console.log("Server Started on PORT 3000");
});
