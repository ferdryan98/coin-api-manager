/* eslint-disable no-await-in-loop */
require('dotenv').config();

const { stringify } = require('querystring');
const api = require('../api');
const models = require('../../models');

const addOrUpdate = async (accounts = []) => {
  // eslint-disable-next-line array-callback-return
  accounts.map((key) => {
    const message = {
      strategy: `${key.strategy}`,
      pair: `${key.pairs[0]}`,
    };
    models.sequelize.query(
      `INSERT INTO bots 
      (botId,accountId,name,isEnabled, pair, strategy, mode,message,createdAt, updatedAt) 
      VALUES ('${key.id}','${key.account_id}','${key.name}',${key.is_enabled},'${key.pairs[0]}','${key.strategy}','${process.env.ACCOUNT_MODE}','${JSON.stringify(message)}','${key.created_at}','${key.updated_at}') on duplicate key update 
      accountId = '${key.account_id}',name ='${key.name}', isEnabled=${key.is_enabled},pair ='${key.pairs[0]}',strategy='${key.strategy}',mode='${process.env.ACCOUNT_MODE}',message='${JSON.stringify(message)}',createdAt ='${key.created_at}',updatedAt = '${key.updated_at}'`,
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

// eslint-disable-next-line consistent-return
const getAllBots = async (_request, h) => {
  try {
    const bots = await models.Bots.findAll({ include: ['account'] });
    return h
      .response({
        status: 'OK',
        data: bots,
      })
      .code(200);
  } catch (error) {
    console.log(error.message);
  }
};

const openTrades = async (request, h) => {
  const { pair, strategy } = request.payload;
  const data = await models.Bots.findAll({
    where: {
      pair,
      strategy,
      mode: `${process.env.ACCOUNT_MODE}`,
    },
  });

  const response = await Promise.all(data.map(async (key) => {
    const payload = {
      bot_id: key.botId,
    };
    await api.botStartNewDeal(payload);
  }));

  console.log(`Semua BOT dengan pair ${pair} telah open posisi ${strategy} sebanyak ${response.length}`);
  return h
    .response({
      status: 'OK',
      response: `Semua BOT dengan pair ${pair} telah open posisi ${strategy} sebanyak ${response.length}`,
    }).code(200);
};

const closeTrades = async (request, h) => {
  const { pair, strategy } = request.payload;
  const data = await models.Bots.findAll({
    where: {
      pair,
      strategy,
      mode: `${process.env.ACCOUNT_MODE}`,
    },
  });
  const bots = data.map((key) => ({ scope: 'active', bot_id: key.botId }));
  let deals = [];
  await Promise.all(bots.map(async (key) => {
    const deal = await api.getDeals((key));
    deals = [...deals, ...deal];
  }));
  if (deals.length < 1) {
    return h.response({
      status: 'OK',
      message: 'No bots are active',
    });
  }
  const response = [];
  await Promise.all(deals.map(async (deal) => {
    response.push(await api.dealPanicSell(deal.id));
  }));

  console.log(`Semua BOT dengan pair ${pair} telah close posisi ${strategy} sebanyak ${response.length}`);
  return h
    .response({
      status: 'OK',
      response: `Semua BOT dengan pair ${pair} telah close posisi ${strategy} sebanyak ${response.length}`,
    }).code(200);
};

const createShortBots = async (request, h) => {
  const { accountId } = request.params;
  const coins = await models.Coins.findAll({});
  const payload = {
    account_id: `${parseInt(accountId, 10)}`,
    pairs: '',
    name: '',
    base_order_volume: 100.0,
    take_profit: 1.0,
    safety_order_volume: 100.0,
    martingale_volume_coefficient: 1.05,
    martingale_step_coefficient: 1.0,
    max_safety_orders: 9,
    active_safety_orders_count: 1,
    safety_order_step_percentage: 1.0,
    take_profit_type: 'base',
    strategy_list: [JSON.stringify({ options: {}, strategy: 'tv_custom_signal' })],
    stop_loss_type: 'stop_loss',
    stop_loss_percentage: 10.0,
    strategy: 'short',
    leverage_type: 'cross',
    leverage_custom_value: 10.0,
    start_order_type: 'market',
    trailing_enabled: true,
    trailing_deviation: 0.2,
  };

  const response = await Promise.all(coins.map(async (key) => {
    payload.pairs = `${key.coinBase}`;
    payload.name = `SHORT ${key.coinBase}`;
    await api.botCreate(payload);
  }));

  return h.response({
    status: 'OK',
    response: `${response.length} short sudah ditambahkan`,
  });
};

const createLongBots = async (request, h) => {
  const { accountId } = request.params;
  const coins = await models.Coins.findAll({});
  const payload = {
    account_id: `${parseInt(accountId, 10)}`,
    pairs: '',
    name: '',
    base_order_volume: 100.0,
    take_profit: 1.0,
    safety_order_volume: 100.0,
    martingale_volume_coefficient: 1.05,
    martingale_step_coefficient: 1.0,
    max_safety_orders: 9,
    active_safety_orders_count: 1,
    safety_order_step_percentage: 1.0,
    take_profit_type: 'base',
    strategy_list: [JSON.stringify({ options: {}, strategy: 'tv_custom_signal' })],
    stop_loss_type: 'stop_loss',
    stop_loss_percentage: 10.0,
    strategy: 'long',
    leverage_type: 'cross',
    leverage_custom_value: 10.0,
    start_order_type: 'market',
    trailing_enabled: true,
    trailing_deviation: 0.2,
  };

  const response = await Promise.all(coins.map(async (key) => {
    payload.pairs = `${key.coinBase}`;
    payload.name = `LONG ${key.coinBase}`;
    await api.botCreate(payload);
  }));

  return h.response({
    status: 'OK',
    response: `${response.length} long sudah ditambahkan`,
  });
};

const accountController = {
  fetchAllRealBots,
  getAllBots,
  openTrades,
  closeTrades,
  createShortBots,
  createLongBots,
};

module.exports = accountController;
