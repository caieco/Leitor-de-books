'use strict';
const exchanges = require("./exchanges");

async function rodando() {
    const preçoBinance = await exchanges.orderbook_binance()
    const preçoBybit = await exchanges.orderbook_bybit();
    const preçoGemini = await exchanges.orderbook_gemini();
    const preçoBitget = await exchanges.orderbook_bitget();

    // Construindo a mensagem para a Binance
    let msgBinance = "BINANCE".padEnd(10);
    msgBinance += `BTCUSDT | PRICE: U$ ${parseFloat(preçoBinance).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Construindo a mensagem para a Bybit
    let msgBybit = "BYBIT".padEnd(10);
    msgBybit += `BTCUSDT | PRICE: U$ ${parseFloat(preçoBybit).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Construindo a mensagem para a Gemini
    let msgGemini = "GEMINI".padEnd(10);
    msgGemini += `BTCUSDT | PRICE: U$ ${parseFloat(preçoGemini).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Construindo a mensagem para a Gemini
    let msgBitget = "BITGET".padEnd(10);
    msgBitget += `BTCUSDT | PRICE: U$ ${parseFloat(preçoGemini).toFixed(2)} | Diff. U$  AquiVaiSpread\n`;

    // Exibindo as mensagens uma abaixo da outra
    console.log(msgBinance + msgBybit + msgGemini + msgBitget);
    
}

setInterval(async () => {
    console.clear()
    rodando()
    

}, 5000)

rodando()