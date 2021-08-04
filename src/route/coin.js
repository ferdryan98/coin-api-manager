const handler = require('../handler/coin');

const prefix = '/coins';

const botRoutes = [
  {
    method: 'POST',
    path: `${prefix}/add_coins`,
    handler: handler.addCoins,
  },
];

module.exports = botRoutes;
