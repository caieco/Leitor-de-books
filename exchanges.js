const axios = require("axios");

// Mapeamento de URLs das exchanges
const exchangeUrls = {
    binance: "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=1",
    bybit: "https://api.bybit.com/v5/market/orderbook?category=spot&symbol=BTCUSDT&limit=1",
    gemini: "https://api.gemini.com/v2/ticker/btcusd",
    hitbtc: "https://api.hitbtc.com/api/3/public/orderbook",
    huobi: "https://api.huobi.pro/market/depth?symbol=btcusdt&depth=5&type=step0",
    bitstamp: "https://www.bitstamp.net/api/v2/order_book/btcusdt/",
    bitmex: "https://www.bitmex.com/api/v1/orderBook/L2?symbol=XBTUSDT&depth=1",
    bitfinex: "https://api-pub.bitfinex.com/v2/ticker/tBTCUSD"
};

// Função genérica para fazer a solicitação HTTP
async function fetchOrderbook(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Erro ao buscar livro de pedidos da exchange: ${error.message}`);
    }
}

// Função para obter os livros de pedidos de cada exchange
async function getOrderbook(exchange) {
    const url = exchangeUrls[exchange];
    if (!url) {
        throw new Error(`Exchange desconhecida: ${exchange}`);
    }
    try {
        const data = await fetchOrderbook(url);
        return parseOrderbook(data, exchange);
    } catch (error) {
        throw new Error(`Erro ao obter livro de pedidos da exchange ${exchange}: ${error.message}`);
    }
}

// Função para analisar os dados do livro de pedidos de cada exchange
function parseOrderbook(data, exchange) {
    switch (exchange) {
        case 'binance':
            return parseFloat(data.bids[0][0]).toFixed(2);
        case 'bybit':
            return data.result.b[0][0];
        case 'gemini':
            return data.bid;
        case 'hitbtc':
            return data.BTCUSDT.bid[0][0];
        case 'huobi':
            return data.tick.bids[0][0];
        case 'bitstamp':
            return data.bids[0][0];
        case 'bitmex':
            return data[0].price;
        case 'bitfinex':
            return data[0];
        default:
            throw new Error(`Exchange não suportada: ${exchange}`);
    }
}

module.exports = {
    getOrderbook
};