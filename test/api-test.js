/**
 * Test the api endpoints
 */

const assert = require('assert');
const http = require('http');

const api = {};

const helpers = {};
helpers.makeHttpRequest = (method, pathName, callback) => {
    const reqConfig = {
        protocol: 'http:',
        hostname: 'localhost',
        port: 3000,
        method: method,
        path: pathName,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(reqConfig, res => {
        //callback the response to be used in the tests
        callback(res);
    });

    req.end();
};

api['non existing path should respond with a 404'] = done => {
    helpers.makeHttpRequest('GET', '/does/not/exist', res => {
        assert.strictEqual(res.statusCode, 404);
        done();
    });
};

api['/ping should respond with a 200 for any method'] = done => {
    helpers.makeHttpRequest('PUT', '/ping', res => {
        assert.strictEqual(res.statusCode, 200);
        done();
    });
};

//test user route for a GET
api['/users GET should respond with a 200'] = done => {
    helpers.makeHttpRequest('GET', '/api/users', res => {
        assert.strictEqual(res.statusCode, 200);
        done();
    });
};

//test user route for a POST
api['/users POST should respond with a 405'] = done => {
    helpers.makeHttpRequest('POST', '/api/users', res => {
        assert.strictEqual(res.statusCode, 405);
        done();
    });
};


module.exports = api;