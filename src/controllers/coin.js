const models = require('../../models');

const addCoins = async (request, h) => {
  const { coins } = request.payload;
  const currDate = new Date().toISOString();
  if (coins.length > 0) {
    // eslint-disable-next-line array-callback-return
    coins.map((key) => {
      models.sequelize.query(
        `INSERT INTO coins (coinBase, created_at, updated_at)
        VALUES ('${key}','${currDate}','${currDate}') on duplicate key update
        coinBase = '${key}',created_at = '${currDate}',updated_at = '${currDate}'
        `,
      );
    });
    return h.response({
      status: 'OK',
    });
  }
  return h
    .response({
      status: 'Bad Request',
    })
    .code(400);
};

const getAllCoins = async (request, h) => {
  const data = await models.Coins.findAll({});
  const response = [];
  // eslint-disable-next-line array-callback-return
  await data.map((key) => {
    const message = {
      action: 'open',
      strategy: 'long',
      pairs: `${key.coinBase}`,
    };
    response.push(message);
  });
  return h.response({
    status: 'OK',
    response,
  });
};
const coinController = { addCoins, getAllCoins };

module.exports = coinController;
