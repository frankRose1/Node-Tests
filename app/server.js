/**
 * Start a basic server to test api endpoints
 */

const http = require('http');
const url = require('url');
const port = 3000 || process.env.PORT;
const {StringDecoder} = require('string_decoder');
const handlers = require('./handlers');
const {parseJsontoObj} = require('./helpers');

const server = {};

server.httpServer = http.createServer( (req, res) => {

    const parsedUrl = url.parse(req.url);

    const urlPath = parsedUrl.pathname;
    const trimmedPath = urlPath.replace(/^\/+|\/+$/g, '');

    const queryStringObj = parsedUrl.query;

    const method = req.method.toLowerCase();

    const headers = req.headers;

    //stream the paylaod
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on("data", data => {
        buffer += decoder.write(data);
    });

    //cap off payload and route the request
    req.on("end", () => {
        buffer += decoder.end();

        const requestHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

        //to be sent to the handler
        const requestData = {
            trimmedPath,
            method,
            queryStringObj,
            headers,
            payload : parseJsontoObj(buffer)
        };

        requestHandler(requestData, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            const payloadStr = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadStr);
            
        });
    });


});

server.router = {
    'ping' : handlers.ping,
    'api/users' : handlers.users
};

server.init = () => {
    server.httpServer.listen(port, () => {
        console.log("Server is listening");
    });
};

server.init();

module.exports = server;