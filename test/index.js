/**
 * Test Runner
 */

const _app = {};
const server = require('../app/server');

_app.tests = {};

_app.tests.unit = require('./unit-test');
_app.tests.api = require('./api-test');

//count the number of tests to be ran
_app.countTests = () => {
    let counter = 0;
    for (let key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            const subTests = _app.tests[key];
            //loop over the sub keys
            for (let test in subTests) {
                if (subTests.hasOwnProperty(test)) {
                    counter++;
                }
            }

        }
    }
    return counter;
};

/**
 * Log a test report to the console
 * @param {integer} limit - number of tests ran 
 * @param {integer} successes - number of tests that passed
 * @param {array} errors - array of error objects
 */
_app.produceTestReport = (limit, successes, errors) => {
    console.log("");
    console.log("-------BEGIN TEST REPORT-------");
    console.log("");
    console.log(`Total Tests: ${limit}`);
    console.log(`Pass: ${successes}`);
    console.log(`Fail: ${errors.length}`);
    console.log("");

    //if there are any errors, print them in detail
    if (errors.length > 0) {
        console.log("");
        console.log("-------BEGIN ERROR DETAILS-------");

        errors.forEach(testError => {
            console.log('\x1b[31m%s\x1b[0m',testError.name);
            console.log(testError.error);
            console.log("");
        });

        console.log("-------BEGIN ERROR DETAILS-------");
        console.log("");
    }
    

    console.log("");
    console.log("-------END TEST REPORT-------");
    process.exit(0);
};

//Loop over all modules in _app and test their functions
_app.runTests = () => {
    const errors = [];
    const limit = _app.countTests();
    let successes = 0;
    let counter = 0;

    //loop through all keys on _app.tests, then loop over each subKey
    for (let key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            const subTests = _app.tests[key];
            for (let test in subTests) {
                if (subTests.hasOwnProperty(test)) {

                    //run the test
                    ( () => {
                        const testName = test;
                        const testFunction = subTests[test];
    
                        try {
                            //the anon function is "done"
                            //done will not be called if the assertion failed
                            testFunction( () => {
                                console.log('\x1b[32m%s\x1b[0m', testName);
                                successes++;
                                counter++;
    
                                if (counter == limit) {
                                    _app.produceTestReport(limit,successes,errors);
                                }
                            });
                        } catch (e) {
                            errors.push({
                                name: testName,
                                error: e
                            });
                            console.log('\x1b[31m%s\x1b[0m', testName);
                            counter++;
    
                            if (counter == limit) {
                                _app.produceTestReport(limit,successes,errors);
                            }
                        }
                    })();

                }
            }
        }
    }
};

setTimeout( () => {
    _app.runTests();
}, 100);
