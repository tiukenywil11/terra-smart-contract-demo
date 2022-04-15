// LCDClient: helps connect to the LCD, Coin: Helps work with assets
const {LCDClient, Coin, MnemonicKey, MsgSend } = require('@terra-money/terra.js');


// create a new connection to the LCD called terra 
const terra = new LCDClient({
    URL: 'http://localhost:1317',
    chainID: 'localterra',
});

const terraTestNet = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12',
});

// adding dummy wallet mnemonic key to test POST requests
const mk = new MnemonicKey({
    mnemonic: 'clog practice dad swamp impact own object demise gate online use table now piano general dumb arena spell fabric truly check boost denial worry'
});

// create a terra wallet instance, using mnemonic key stated above
const wallet = terraTestNet.wallet(mk);
    
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

const sendTransactionToLCD = async() => {

    const address = 'terra13885pj0s4sgv0dcpk6r2ftph750h8jlt88m0ej';
    const [balance] = await terraTestNet.bank.balance(address);
    console.log(balance.toData());

    // create a transaction
    // MsgSend, takes 3 parameters, 'wallet from, wallet to, and transfer amount
    // in this case, send to self 0.1 usd
    const my_tx = new MsgSend(
        'terra13885pj0s4sgv0dcpk6r2ftph750h8jlt88m0ej',
        'terra13885pj0s4sgv0dcpk6r2ftph750h8jlt88m0ej',
        { uluna: 10000 },
    );

    // create and sign the transaction
    // createAndSignTx takes 2 parameters, msgs: which is usally the transcation, and memo: memo message with the transaction
    const messageSending = await wallet.createAndSignTx({
        msgs:[my_tx],
        memo: 'test transaction for terra'
    });

    // broadcast the message to the LCD [sending to testnet]
    const result = await terraTestNet.tx.broadcast(messageSending);

    console.log(result.txhash);
}

sendTransactionToLCD();
