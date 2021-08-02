const controllers = require('../controllers/bot');

const getAllBots = async (request, h) => {
  const response = await controllers.getAllBots(request, h);
  return h.response(response);
};
const fetchAllRealBots = async (request, h) => {
  const response = await controllers.fetchAllRealBots(request, h);
  return h.response(response, h);
};

module.exports = { fetchAllRealBots, getAllBots };
