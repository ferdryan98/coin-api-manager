const api = require('../api');

const getAllDeals = async (request, h) => {
  const response = await api.getDeals(request, h);
  return response;
};

module.exports = getAllDeals;
