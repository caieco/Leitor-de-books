const axios = require("axios");

// DECLARANDO AS URL'S DAS EXCHANGES
const binanceUrl = "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1"
const bybitUrl = "https://api.bybit.com/v5/market/orderbook?category=spot&symbol=BTCUSDT&limit=1"
const geminiUrl = "https://api.gemini.com/v2/ticker/btcusd"
const hitbtcUrl = "https://api.hitbtc.com/api/3/public/orderbook"
const huobiUrl = "https://api.huobi.pro/market/depth?symbol=btcusdt&depth=5&type=step0"
const bitstampUrl = "https://www.bitstamp.net/api/v2/order_book/btcusdt/"

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

async function orderbook_hitbtc() {
    try {
    const data = {
        depth:1,
        symbols:'BTCUSDT'
    }
    const result = await axios.get(hitbtcUrl, {
        params: data
    })
    const obj = result
    return obj.data.BTCUSDT.bid[0][0]
    } catch(err) {
        console.error(err)
    }
}

async function orderbook_huobi() {
    try {
    const result = await axios.get(huobiUrl)
    const obj = result.data.tick.bids[0][0]
    return obj
    } catch(err) {
        console.error(err)
    }
}

async function orderbook_bitstamp() {
    try {
    const result = await axios.get(bitstampUrl)
    const obj = result.data.bids[0][0]
    return obj
    } catch(err) {
        console.error(err)
    }
}


module.exports = {
    orderbook_binance, orderbook_bybit, orderbook_gemini, orderbook_hitbtc, orderbook_huobi,
    orderbook_bitstamp
}