const controllers = require('../controllers/coin');

const addCoins = async (request, h) => {
  const response = await controllers.addCoins(request, h);
  return h.response(response, h);
};

module.exports = { addCoins };
