const dev = require('./dev.env');
const prod = require('./prod.env');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'production';
const sessionName = isProduction ? 'deponent' : `deponent-${NODE_ENV}`;

module.exports = {
  env: isProduction ? prod : dev,

  session: {
    name: sessionName,
    keys: isProduction ? [
      'xcdsfdzc evdvefger5t6xccxvNOB::b ylibvlIV fefe',
      'sdcsm;LNO:(u870N(*Hb6v&VLMLP(/m;n;b*BPVOVU^vc7ocsxslmsds',
    ] : [''],
  },
};
