const api = require('../api');

const getAllDeals = async (request, h) => {
  const response = await api.getDeals(request);
  return h.response(response);
};

module.exports = getAllDeals;
