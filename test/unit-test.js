/**
 * Test the lib file
 */
const lib = require('../app/lib');
const helpers = require('../app/helpers');
const assert = require('assert');

const unit = {};

unit['lib.getANumber should return 1'] = done => {
    const val = lib.getANumber();
    assert.strictEqual(val, 1);
    done();
};

unit['lib.getANumber should return a number'] = done => {
    const val = lib.getANumber();
    assert.strictEqual(typeof(val), 'number');
    done();
};

//This test should fail
unit['lib.getANumber should return 2'] = done => {
    const val = lib.getANumber();
    assert.strictEqual(val, 2);
    done();
};

unit['helpers.parseJsonToObj should not throw when passed a valid string'] = done => {
    assert.doesNotThrow( () => {
        helpers.parseJsontoObj('{ "name":"John", "age":23, "city":"New York"}');
        done();
    }, TypeError);
};

//this will throw an error
unit['lib.throwError should not throw a reference error'] = done => {
    assert.doesNotThrow( () => {
        lib.throwError();
        done();
    }, TypeError);
};



module.exports = unit;