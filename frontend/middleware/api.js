const proxy = require('express-http-proxy');
const config = require('../config/common.json');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'production';
const address = isProduction ? config.apiProd : config.apiDev;

module.exports = () => (req, res, next) => {
    proxy(address, {
        https: config.https,
        timeout: config.timeout
    })(req, res, next);
};
