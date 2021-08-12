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
  {
    method: 'POST',
    path: `${prefix}/trade_signal`,
    handler: handler.newTradeSignal,
  },
  {
    method: 'POST',
    path: `${prefix}/create_short_bots/{accountd}`,
    handler: handler.createShortBots,
  },
  {
    method: 'POST',
    path: `${prefix}/create_long_bots/{accountId}`,
    handler: handler.createLongBots,
  },
  {
    method: 'POST',
    path: `${prefix}/update_all_bots/{accountId}`,
    handler: handler.updateAllBots,
  },
];

module.exports = botRoutes;
