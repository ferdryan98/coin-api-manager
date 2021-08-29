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
      (
        bot_id,
        account_id,
        name,
        base_order_volume,
        take_profit,
        safety_order_volume,
        martingale_volume_coefficient,
        martingale_step_coefficient,
        max_safety_orders,
        active_safety_orders_count,
        safety_order_step_percentage,
        take_profit_type,
        strategy_list,
        stop_loss_type,
        stop_loss_percentage,
        strategy,
        leverage_type,
        leverage_custom_value,
        start_order_type,
        trailing_enabled,
        trailing_deviation,
        is_enabled,
        pairs,
        mode,
        message,
        created_at,
        updated_at) 
      VALUES (
        '${key.id}',
        '${key.account_id}',
        '${key.name}',
        '${key.base_order_volume}',
        '${key.take_profit}',
        '${key.safety_order_volume}',
        '${key.martingale_volume_coefficient}',
        '${key.martingale_step_coefficient}',
        '${key.max_safety_orders}',
        '${key.active_safety_orders_count}',
        '${key.safety_order_step_percentage}',
        '${key.take_profit_type}',
        '${JSON.stringify(key.strategy_list)}',
        '${key.stop_loss_type}',
        '${key.stop_loss_percentage}',
        '${key.strategy}',
        '${key.leverage_type}',
        '${key.leverage_custom_value}',
        '${key.start_order_type}',
        ${key.trailing_enabled},
        '${key.trailing_deviation}',
        ${key.is_enabled},
        '${key.pairs[0]}',
        '${process.env.ACCOUNT_MODE}',
        '${JSON.stringify(message)}',
        '${key.created_at}',
        '${key.updated_at}') on duplicate key update 
      account_id = '${key.account_id}',
      name ='${key.name}', 
      base_order_volume = '${key.base_order_volume}',
      take_profit = '${key.take_profit}',
      safety_order_volume = '${key.safety_order_volume}',
      martingale_volume_coefficient = '${key.martingale_volume_coefficient}',
      martingale_step_coefficient = '${key.martingale_step_coefficient}',
      max_safety_orders = '${key.max_safety_orders}',
      active_safety_orders_count = '${key.active_safety_orders_count}',
      safety_order_step_percentage = '${key.safety_order_step_percentage}',
      take_profit_type = '${key.take_profit_type}',
      strategy_list = '${JSON.stringify(key.strategy_list)}',
      stop_loss_type = '${key.stop_loss_type}',
      stop_loss_percentage = '${key.stop_loss_percentage}',
      strategy = '${key.strategy}',
      leverage_type = '${key.leverage_type}',
      leverage_custom_value = '${key.leverage_custom_value}',
      start_order_type = '${key.start_order_type}',
      trailing_enabled = ${key.trailing_enabled},
      trailing_deviation = '${key.trailing_deviation}',
      is_enabled=${key.is_enabled},
      pairs ='${key.pairs[0]}',
      mode='${process.env.ACCOUNT_MODE}',
      message='${JSON.stringify(message)}',
      created_at ='${key.created_at}',
      updated_at = '${key.updated_at}'`,
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
      pairs: pair,
      strategy,
      mode: `${process.env.ACCOUNT_MODE}`,
    },
  });

  const response = await Promise.all(
    data.map(async (key) => {
      const payload = {
        bot_id: key.bot_id,
      };
      console.log(await api.botStartNewDeal(payload));
    }),
  );

  console.log(
    `Semua BOT dengan pair ${pair} telah open posisi ${strategy} sebanyak ${response.length}`
  );
  return h
    .response({
      status: 'OK',
      response: `Semua BOT dengan pair ${pair} telah open posisi ${strategy} sebanyak ${response.length}`,
    })
    .code(200);
};

const closeTrades = async (request, h) => {
  const { pair, strategy } = request.payload;
  const data = await models.Bots.findAll({
    where: {
      pairs: pair,
      strategy,
      mode: `${process.env.ACCOUNT_MODE}`,
    },
  });
  const bots = data.map((key) => ({ scope: 'active', bot_id: key.bot_id }));
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
    max_safety_orders: 0,
    active_safety_orders_count: 1,
    safety_order_step_percentage: 1.0,
    take_profit_type: 'base',
    strategy_list: [JSON.stringify({ options: {}, strategy: 'manual' })],
    stop_loss_type: 'stop_loss',
    stop_loss_percentage: 1.0,
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
    console.log(await api.botCreate(payload));
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
    max_safety_orders: 0,
    active_safety_orders_count: 1,
    safety_order_step_percentage: 1.0,
    take_profit_type: 'base',
    strategy_list: [JSON.stringify({ options: {}, strategy: 'manual' })],
    stop_loss_type: 'stop_loss',
    stop_loss_percentage: 1.0,
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

const updateAllBots = async (request, h) => {
  const { accountId } = request.params;
  // eslint-disable-next-line camelcase
  const { stop_loss_percentage, max_safety_orders } = request.payload;
  const bots = await models.Bots.findAll({
    where: {
      account_id: accountId,
    },
  });
  const response = await Promise.all(bots.map(async (key) => {
    const params = {
      ...key.dataValues,
      stop_loss_percentage,
      max_safety_orders,
    };
    await api.botUpdate(params);
  }));
  return h.response({
    status: 'OK',
    response,
  });
};
const accountController = {
  fetchAllRealBots,
  getAllBots,
  openTrades,
  closeTrades,
  createShortBots,
  createLongBots,
  updateAllBots,
};

module.exports = accountController;
