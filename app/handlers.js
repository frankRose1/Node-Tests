/**
 * Handle the request
 */

const handlers = {};

//only doing get requests for testing
const acceptableMethods = ['get'];

handlers.users = (data, callback) => {
    if (acceptableMethods.indexOf(data.method) > -1) {

        const userData = {
            name: 'John Smith',
            email: 'testing123@test.com',
            location: {
                street: '123 fake street',
                zip: '12345',
                city: 'New York'
            },
            age: 23
        };

        callback(200, userData);
    } else {
        callback(405);
    }
};

//respond with a 200
handlers.ping = (data, callback) => {
    callback(200);
};

handlers.notFound = (data, callback) => {
    callback(404);
};

//export for the server
module.exports = handlers;