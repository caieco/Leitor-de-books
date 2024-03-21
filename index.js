'use strict';
const exchanges = require("./exchanges");

async function rodando() {
    const preçoBinance = await exchanges.orderbook_binance()
    const preçoBybit = await exchanges.orderbook_bybit();
    const preçoGemini = await exchanges.orderbook_gemini();
    const preçoHitBtc = await exchanges.orderbook_hitbtc();
    const preçoHuobi = await exchanges.orderbook_huobi();
    const preçoBitstamp = await exchanges.orderbook_bitstamp();

    
    // Construindo a mensagem para a Binance
    let msgBinance = "BINANCE".padEnd(10);
    msgBinance += `BTCUSDT | PRICE: U$ ${parseFloat(preçoBinance).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Construindo a mensagem para a Bybit  
    let msgBybit = "BYBIT".padEnd(10);
    msgBybit += `BTCUSDT | PRICE: U$ ${parseFloat(preçoBybit).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Construindo a mensagem para a Gemini
    let msgGemini = "GEMINI".padEnd(10);
    msgGemini += `BTCUSDT | PRICE: U$ ${parseFloat(preçoGemini).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

   // Construindo a mensagem para a HitBtc
    let msgHitBtc = "HITBTC".padEnd(10);
    msgHitBtc += `BTCUSDT | PRICE: U$ ${parseFloat(preçoHitBtc).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    let msgHuobi = "HUOBI".padEnd(10);
    msgHuobi += `BTCUSDT | PRICE: U$ ${parseFloat(preçoHuobi).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    let msgBitstamp = "BITSTAMP".padEnd(10);
    msgBitstamp += `BTCUSDT | PRICE: U$ ${parseFloat(preçoBitstamp).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;
    
    // Exibindo as mensagens uma abaixo da outra
    console.log(msgBinance + msgBybit + msgGemini + msgHitBtc + msgHuobi + msgBitstamp);
    
}

setInterval(async () => {
   // console.clear()
    rodando()
}, 5000)

rodando()