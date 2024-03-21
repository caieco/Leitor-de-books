const axios = require("axios");

// DECLARANDO AS URL'S DAS EXCHANGES
const binanceUrl = "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1"
const bybitUrl = "https://api.bybit.com/v5/market/orderbook?category=spot&symbol=BTCUSDT&limit=1"
const geminiUrl = "https://api.gemini.com/v2/ticker/btcusd"
const bitgetUrl = "https://api.bitget.com/api/v2/common/trade-rate?symbol=BTCUSDT&businessType=spot"

async function orderbook_binance() {
    try {
        const result = await axios.get(binanceUrl)
        const obj = result.data
        const preço = parseFloat(obj.bids[0][0]).toFixed(2)
        return preço
    } catch (err) {
        console.error(err)
    }
}

async function orderbook_bybit() {
    try {
        const result = await axios.get(bybitUrl)
        const obj = result.data
        const preço = obj.result.b[0][0]
        return preço
    } catch(err) {
        console.error(err)
    }
}

async function orderbook_gemini() {
    try {
    const result = await axios.get(geminiUrl)
    const obj = result.data
    return obj.bid
    } catch(err) {
        console.error(err)
    }
}

async function orderbook_bitget() {
    try {
    const result = await axios.get(bitgetUrl)
    const obj = result.data
    return obj.bid
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    orderbook_binance, orderbook_bybit, orderbook_gemini, orderbook_bitget
}