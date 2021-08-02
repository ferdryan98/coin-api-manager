const handler = require('../handler/account');

const prefix = '/accounts';

const botRoutes = [
  {
    method: 'GET',
    path: `${prefix}`,
    handler: handler.getAllAccounts,
  },
  {
    method: 'GET',
    path: `${prefix}/fetch`,
    handler: handler.fetchAllRealAccount,
  },
];

module.exports = botRoutes;
