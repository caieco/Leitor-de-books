'use strict';
const exchanges = require("./exchanges");

async function rodando() {
    // Obter os preços de todas as corretoras
    const [preçoBinance, preçoBybit, preçoGemini, preçoHitBtc, preçoHuobi, preçoBitstamp, preçoBitmex, preçoBitfinex] = await Promise.all([
        exchanges.getOrderbook('binance'),
        exchanges.getOrderbook('bybit'),
        exchanges.getOrderbook('gemini'),
        exchanges.getOrderbook('hitbtc'),
        exchanges.getOrderbook('huobi'),
        exchanges.getOrderbook('bitstamp'),
        exchanges.getOrderbook('bitmex'),
        exchanges.getOrderbook('bitfinex')
    ]);

    // Calcular o preço mais alto e o mais baixo
    const menorPreco = Math.min(preçoBinance, preçoBybit, preçoGemini, preçoHitBtc, preçoHuobi, preçoBitstamp, preçoBitmex, preçoBitfinex);
    const maiorPreco = Math.max(preçoBinance, preçoBybit, preçoGemini, preçoHitBtc, preçoHuobi, preçoBitstamp, preçoBitmex, preçoBitfinex);

    // Construir as mensagens para cada corretora e calcular o diff
    const mensagens = [
        { corretora: "BINANCE", preço: preçoBinance },
        { corretora: "BYBIT", preço: preçoBybit },
        { corretora: "GEMINI", preço: preçoGemini },
        { corretora: "HITBTC", preço: preçoHitBtc },
        { corretora: "HUOBI", preço: preçoHuobi },
        { corretora: "BITSTAMP", preço: preçoBitstamp },
        { corretora: "BITMEX", preço: preçoBitmex },
        { corretora: "BITFINEX", preço: preçoBitfinex }
    ];

    // Ordenar as mensagens pelo diff
    mensagens.sort((a, b) => {
        const diffA = a.preço - menorPreco;
        const diffB = b.preço - menorPreco;
        return diffA - diffB;
    });

    // Calcular o spread percentual
    const spreadPercentual = mensagens.map(msg => {
        const spread = ((msg.preço - menorPreco) / menorPreco) * 100;
        return { corretora: msg.corretora, spread: spread };
    });

    // Exibir as mensagens com os valores mais baixo e mais alto
    mensagens.forEach(msg => {
        const diff = msg.preço - menorPreco;
        console.log(`${msg.corretora.padEnd(10)}BTCUSDT | PRICE: U$ ${parseFloat(msg.preço).toFixed(2)} | Diff. U$ ${diff.toFixed(2)}`);
    });

    // Exibir o valor mais baixo e o mais alto com os nomes das corretoras
    console.log(`\nValor mais baixo: U$ ${parseFloat(menorPreco).toFixed(2)} (${mensagens[0].corretora})`);
    console.log(`Valor mais alto: U$ ${parseFloat(maiorPreco).toFixed(2)} (${mensagens[mensagens.length - 1].corretora})`);

    // Exibir o spread percentual
    console.log("\nSpread Percentual:");
    spreadPercentual.forEach(spread => {
        console.log(`${spread.corretora.padEnd(10)}Spread: ${spread.spread.toFixed(2)}%`);
    });
}

setInterval(async () => {
    console.clear(); // Limpar o console antes de exibir os novos preços
    await rodando();
}, 5000);

rodando(); // Chamar a função pela primeira vez