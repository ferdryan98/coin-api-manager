/* eslint-disable no-await-in-loop */
const api = require('../api');
const models = require('../models');

const addOrUpdate = async (accounts = []) => {
  // eslint-disable-next-line array-callback-return
  accounts.map((key) => {
    models.sequelize.query(
      `INSERT INTO bots 
      (botId,accountId,name,isEnabled, pair, createdAt, updatedAt) 
      VALUES ('${key.id}','${key.account_id}','${key.name}',${key.is_enabled},'${key.pairs[0]}','${key.created_at}','${key.updated_at}') on duplicate key update 
      accountId = '${key.account_id}',name ='${key.name}', isEnabled=${key.is_enabled},pair ='${key.pairs[0]}',createdAt ='${key.created_at}',updatedAt = '${key.updated_at}'`,
    );
  });
};

const fetchAllRealBots = async (request, h) => {
  const { page, limit } = request.query;
  if (page > 1) {
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10) + 1;
    request.query = { ...request.query, offset };
  }
  const bots = await api.getBots(request.query);
  if (bots.length > 0) {
    await addOrUpdate(bots);
  } else {
    return h
      .response({
        status: 'Range Not Satisfiable',
        message: 'Data bot sudah terupdate',
      })
      .code(416);
  }
  return h
    .response({
      status: 'OK',
      data: bots,
    })
    .code(200);
};

const getAllBots = async (request, h) => {
  const bots = await models.Bots.findAll({
    include: ['account'],
  });
  return h
    .response({
      status: 'OK',
      data: bots,
    }).code(200);
};

const accountController = { fetchAllRealBots, getAllBots };

module.exports = accountController;
