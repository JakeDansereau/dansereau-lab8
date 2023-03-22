// Loads the HTTP module 
var http = require('http');

// Load the file system module.
var fs = require('fs');

// Store the port number that our server will be on 
const PORT = 1337;

// Create a function called serveStaticFile that tries to read the 
// file located at the path being passed in. 
// This function should include the following:
 function serveStaticFile(res, path, contentType, responseCode){
    //if there is no http response code, then assume everything is okay
    //      set http resource status code to 200 to tell browser everything i sokay
    if(!responseCode){
        responseCode = 200;
    }

    // Try to read the file that is located at the path 
    // that is being passed in. If there is an error, 
    // then tell the browser that there was an internal
    // error. Otherwise, provide the browser with the 
    //response code, content type and data that was passed in.

    fs.readFile(__dirname + path, function(err,data){
        //tell the browser there was an internal server error
        if(err){
            //include in our header that there was an internal server error
            res.writeHead(500, {"Content-Type" : "text/plain"});

            // give the user an eeror mesg in plain text and tell browser all info has been sent
            res.end('500 - Internal Error')
        }else{
            //otherwise, we know that there is no error and that it works
                
            //give it whather the response code and content type was
            res.writeHead(responseCode, {'Content-Type': contentType});

            //send our wahterver data we have
            res.end(data);
        }
    });
 }

 http.createServer(function(req, res){
    //normalize url by querystring, optional trailing slash, and making lwoercase
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();

    // if they go to url, tehn serve home page
    //      break tells sqitch statment that this case is over and doen executing

    switch(path){
        case '':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        case '/index':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        case '/contact':
            serveStaticFile(res, '/public/contact.html', 'text/html');            
            break;
        case '/posts':
            serveStaticFile(res, '/public/posts.html', 'text/html');
            break;
        case '/under-construction':
            serveStaticFile(res, '/public/under-construction.html', 'text/html');
            break;
        case '/css/style.css':
            serveStaticFile(res, '/public/css/style.css', 'text/css');
            break;
        case '/images/404bottom.gif':
            serveStaticFile(res, '/public/images/404bottom.gif', 'image/gif');
            break;
        case '/images/404mid.gif':
            serveStaticFile(res, '/public/images/404mid.gif', 'image/gif');
            break;
        case '/images/404top_w.jpg':
            serveStaticFile(res, '/public/images/404top_w.jpg', 'image/jpg');
            break;
        case '/images/blogging.png':
            serveStaticFile(res, '/public/images/blogging.png', 'image/png');
            break;
        case '/images/computer-typing.jpeg':
            serveStaticFile(res, '/public/images/computer-typing.jpeg', 'image/jpeg');
            break;
        case '/images/construction.png':
            serveStaticFile(res, '/public/images/construction.png', 'image/png');
            break;
        case '/images/logo.png':
            serveStaticFile(res, '/public/images/logo.png', 'image/png');
            break;
        case '/images/merch.png':
            serveStaticFile(res, '/public/images/merch.png', 'image/png');
            break;
        case '/images/x.png':
            serveStaticFile(res, '/public/images/x.png', 'image/png');
            break;
            
       
        // in the case that it is none of the above, we have a defaule case so that our server does not break
        //  and we serve the 404 page
        //  we let serve lknow that something went wrong by setting http response status code to 404
        default: 
            serveStaticFile(res, '/public/css/style.css', 'text/css');
            serveStaticFile(res, '/public/images/404bottom.gif', 'image/gif');
            serveStaticFile(res, '/public/images/404mid.gif', 'image/gif');
            serveStaticFile(res, '/public/images/404top_w.jpg', 'image/jpg');
            serveStaticFile(res, '/public/404.html', 'text/html', 404);

            break;
    }
 }).listen(PORT); // tell the server what port to be on 

 
console.log("Server running on: http://localhost:" + PORT);