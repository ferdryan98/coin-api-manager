const controllers = require('../controllers/account');

const getAllAccounts = async (request, h) => {
  const response = await controllers.getAllAccount(request, h);
  return response;
};

const getAccountById = async (request, h) => {
  const response = await controllers.getAccountById(request, h);
  return response;
};

const fetchAllRealAccount = async (request, h) => {
  const response = await controllers.fetchAllRealAccount(request, h);
  return response;
};

module.exports = { getAllAccounts, fetchAllRealAccount, getAccountById };
