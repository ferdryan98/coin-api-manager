const api = require('../api');
const models = require('../../models');
require('dotenv').config();

const addOrUpdate = async (accounts = []) => {
  const data = accounts.map((key) => models.sequelize.query(
    `INSERT INTO accounts (accountId, name,mode, createdAt, updatedAt) 
    VALUES ('${key.id}','${key.name}','${process.env.ACCOUNT_MODE}','${key.created_at}','${key.updated_at}') on duplicate key update 
    name = '${key.name}',mode='${process.env.ACCOUNT_MODE}', createdAt = '${key.created_at}', updatedAt = '${key.updated_at}'`,
  ));
  return data;
};

const fetchAllRealAccount = async (request, h) => {
  const accounts = await api.accounts(request.query);
  await addOrUpdate(accounts);
  return h.response({
    status: 'OK',
    data: accounts,
  }).code(200);
};

const getAllAccount = async (request, h) => {
  const accounts = await models.Accounts.findAll({
    include: ['bots'],
  });

  return h
    .response({
      status: 'OK',
      data: accounts,
    })
    .code(200);
};

const getAccountById = async (request, h) => {
  const { accountId } = request.params;
  console.log(accountId);
  const account = await models.Accounts.findAll({
    where: {
      accountId,
    },
    include: ['bots'],
  });
  return h
    .response({
      status: 'OK',
      data: account,
    })
    .code(200);
};

const accountController = { fetchAllRealAccount, getAllAccount, getAccountById };

module.exports = accountController;
