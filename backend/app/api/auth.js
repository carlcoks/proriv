const jwt = require('jsonwebtoken'),
      config = require('../../config');
      
const api = {};

api.verify = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');
  if (split.length === 2) return split[1];
    else return null;
  } else return null;
}

module.exports = api;
