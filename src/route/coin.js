const handler = require('../handler/coin');

const prefix = '/coins';

const botRoutes = [
  {
    method: 'POST',
    path: `${prefix}/add_coins`,
    handler: handler.addCoins,
  },
  {
    method: 'GET',
    path: `${prefix}`,
    handler: handler.getAllCoins,
  },
];

module.exports = botRoutes;
