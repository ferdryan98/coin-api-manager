const handler = require('../handler/bot');

const prefix = '/bots';

const botRoutes = [
  {
    method: 'GET',
    path: `${prefix}`,
    handler: handler.getAllBots,
  },
  {
    method: 'GET',
    path: `${prefix}/fetch`,
    handler: handler.fetchAllRealBots,
  },
];

module.exports = botRoutes;
