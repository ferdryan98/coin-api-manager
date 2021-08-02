/* eslint-disable no-underscore-dangle */
const ThreeCommasAPI = require('./threeCommas');
require('dotenv').config();

const api = new ThreeCommasAPI({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  forcedMode: process.env.ACCOUNT_MODE,
});

module.exports = api;
