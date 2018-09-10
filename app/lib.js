/**
 * Functions to be tested by the test runner
 */

const lib = {};

//return a number
lib.getANumber = () => 1;

//test if an input is a string
lib.isItAString = (input) => typeof(input) == 'string' ? true : false;

//throw a reference error
lib.throwError = () => {
    const foo = bar;
    return foo;
};

//export to the test runner
module.exports = lib;