const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res)=>{

    //console.log('Request Made');
    //console.log(req.url, req.method);

    //res.setHeader('Content-Type','text/plain');
    //res.write('Hello Ninjas');

    /* res.setHeader('Content-Type','text/html');

    res.write('<h1>Hello Ninjas</h1>');
    res.write('<h3>Howdy</h3>'); */



    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(

        ()=>{
            console.log('Hello');
        }
    )

    greet();
    greet();

    
    res.setHeader('Content-Type','text/html');

    let path = './views/';

    switch(req.url){

        case '/' : 
            path+='index.html';
            res.statusCode = 200;  
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200;  
            break;
        // Redirection
        case '/about-mue':
            res.statusCode = 301;  
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode = 404;  
            break;
    
    
        }



    fs.readFile(path, (error, data)=>{ 

        if(error){
            console.log(error);
            res.end();
        }
        
        res.write(data);
        res.end();
    
    });



});

server.listen(3000, 'localhost', ()=>{
    console.log('Listening on Port 3000');
});