// LCDClient: helps connect to the LCD, Coin: Helps work with assets
const {LCDClient, Coin } = require('@terra-money/terra.js');

// create a new connection to the LCD called terra 
const terra = new LCDClient({
    URL: 'http://localhost:1317',
    chainID: 'localterra',
});

// create a new coin, with swap rate linked to USD
// swap rate parameter 1,000,000 is equal to 1
const offerCoin = new Coin('uusd', '1000000');

const swapRateFunction = async() => {
    // get the swap rate information of the coin offered to EUR
    const swapRate = await terra.market.swapRate( offerCoin,  'ueur');
    // asynchronously log the euro swap rate
    console.log(`The Euro to ${offerCoin.toString()} rate is currently ${swapRate.toString()}`);
};

swapRateFunction();