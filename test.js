'use strict';
require('dotenv').config();

const ccxt = require('ccxt');

const bitfinex = new ccxt.pro.bitfinex();
const coinbase = new ccxt.pro.coinbase({
  apiKey: process.env.COINBASE_API_KEY,
  secret: process.env.COINBASE_SECRET_KEY,
});
const gemini = new ccxt.pro.gemini();

setInterval(async () => {
  const symbol = 'BTC/USDT';
  const bfPrice = (await bitfinex.fetchTicker(symbol)).close;
  const cbPrice = (await coinbase.fetchTicker(symbol)).close;
  const gPrice = (await gemini.fetchTicker(symbol)).close;

  const bfVsCb = ((bfPrice / cbPrice) - 1) * 100;
  const bfVsg = ((bfPrice / gPrice) - 1) * 100;
  const cbVsg = ((cbPrice / gPrice) - 1) * 100;

  let msg = `${symbol} `
  msg += `${bfVsCb.toFixed(5)}%`.padStart(10)
  msg += `${bfVsg.toFixed(5)}%`.padStart(10)
  msg += `${cbVsg.toFixed(5)}%`.padStart(10)
  msg += ` | Bitfinex  U$ ` + `${bfPrice.toFixed(2)}`.padStart(10)
  msg += ` | Coinbase  U$ ` + `${cbPrice.toFixed(2)}`.padStart(10)
  msg += ` | Gemini  U$ ` + `${gPrice.toFixed(2)}`.padStart(10)
  console.log(msg);
}, 1000)
