const getAllDeals = require('../handler/deal');

const dealRoutes = [
  {
    method: 'GET',
    path: '/deals',
    handler: getAllDeals,
  },
];

module.exports = dealRoutes;
