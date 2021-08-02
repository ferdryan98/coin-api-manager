const controllers = require('../controllers/account');

const getAllAccounts = async (request, h) => {
  const response = await controllers.getAllAccount(request, h);
  return h.response(response, h);
};

const fetchAllRealAccount = async (request, h) => {
  const response = await controllers.fetchAllRealAccount(request, h);
  return h.response(response, h);
};

module.exports = { getAllAccounts, fetchAllRealAccount };
