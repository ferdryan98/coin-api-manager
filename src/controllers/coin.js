const models = require('../../models');

const addCoins = async (request, h) => {
  const { coins } = request.payload;
  const currDate = new Date().toISOString();
  if (coins.length > 0) {
    // eslint-disable-next-line array-callback-return
    coins.map((key) => {
      models.sequelize.query(
        `INSERT INTO coins (coinBase, createdAt, updatedAt)
        VALUES ('${key}','${currDate}','${currDate}') on duplicate key update
        coinBase = '${key}',updatedAt = '${currDate}'
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
  const data = await models.Coin.findAll({});
  const response = [];
  // eslint-disable-next-line array-callback-return
  data.map((key) => {
    const message = {
      action: 'open',
      strategy: 'long',
      pair: `${key.coinBase}`,
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
