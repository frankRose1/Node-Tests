
const helpers = {};

helpers.parseJsontoObj = str => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
};

module.exports = helpers;