const controllers = require('../controllers/bot');

const getAllBots = async (request, h) => {
  const response = await controllers.getAllBots(request, h);
  return response;
};
const fetchAllRealBots = async (request, h) => {
  const response = await controllers.fetchAllRealBots(request, h);
  return response;
};
const newTradeSignal = async (request, h) => {
  const { action } = request.payload;
  const response = await action !== 'close'
    ? controllers.openTrades(request, h)
    : controllers.closeTrades(request, h);
  return response;
};
const createShortBots = async (request, h) => {
  const response = controllers.createShortBots(request, h);
  return response;
};
const createLongBots = async (request, h) => {
  const response = controllers.createLongBots(request, h);
  return response;
};

module.exports = {
  fetchAllRealBots,
  getAllBots,
  newTradeSignal,
  createShortBots,
  createLongBots,
};
