import axios from 'axios';
import config from '../../config/common';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? config.apiProd : config.apiDev;

export default axios.create({
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    'Content-Type': 'application/json',
  },
});
