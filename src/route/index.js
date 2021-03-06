const botRoutes = require('./bot');
const dealRoutes = require('./deal');
const accountRoutes = require('./account');
const coinRoutes = require('./coin');

const notFound = {
  method: '*',
  path: '/{any*}',
  handler: (_request, h) => h.response({
    status: 'fail',
    message: 'Page Not Found!',
  }).code(404),
};

const routes = [
  notFound,
  ...botRoutes,
  ...dealRoutes,
  ...accountRoutes,
  ...coinRoutes,
];

module.exports = routes;
