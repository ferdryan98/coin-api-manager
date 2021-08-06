const api = require('../api');

const getAllDeals = async (request, h) => {
  const response = await api.getDeals(request.query);
  return h.response({
    status: 'OK',
    data: response,
  });
};

module.exports = getAllDeals;
