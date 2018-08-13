
import Coinbase from './coinbase';
import axios from 'axios';

// TODO: Refactor request into a helper function
const request = axios.create({

});

function arbitrage() {
  // Use Bitcoin (on Coinbase), SGD, USD as elements in the Arbitrage
  this.btc = {
    calculate: async (capital) => {
      let profitRate = 0;
      // Get exchange rate of SGD with 1 USD
      const currencyExchangeRates = await Coinbase.exchanges.get('USD');
      const usdToSgd = currencyExchangeRates['SGD'];
      const sgdToUsd = 1 / usdToSgd;
      // Get exchange rate of 1 USD for 1 BTC in coinbase
      const usdCryptoPrices = await Coinbase.prices.getSpotAll('USD');
      const btcToUsd =  usdCryptoPrices['BTC'];
      const usdToBtc = (1 / btcToUsd).toFixed(8);
      // Get exchange rate of 1 SGD for 1 BTC in Singapore market (API returns 8 dp)
      const sgdBtcExchangeRates = await request.get('https://blockchain.info/ticker');
      const btcToSgd = sgdBtcExchangeRates.data['SGD'].last;
      const sgdToBtc = (1/ btcToSgd).toFixed(8);
      /* Calculate potential profit from following steps if any
       * 1. USD buys "x" BTC on "coinbase"
       * 2. BTC sells for "y" SGD on "Singapore Market"
       * 3. "y" SGD converts back to USD
      */
      const btcSoldForSgd = usdToBtc * btcToSgd;
      const usdRevenue = btcSoldForSgd * sgdToUsd;
      profitRate = usdRevenue - usdToSgd;
      if (profitRate < 0 ) {
        /* Reverse Arbitrage by starting with 1 SGD,
         * 1. SGD buys "x" BTC on "Singapore Market"
         * 2. BTC sells for "y" USD on "Coinbase"
         * 3. "y" USD converts back to SGD
        */
        console.log('> SGD to BTC:', sgdToBtc);
        console.log('> BTC to USD', btcToUsd);
        const btcSoldForUsd = sgdToBtc * btcToUsd;
        console.log('> BTC sold for USD:', btcSoldForUsd);
        console.log('> USD to SGD', usdToSgd);
        const sgRevenue = btcSoldForUsd * usdToSgd;
        profitRate = sgRevenue - sgdToUsd;
      }
      console.log('> Profit:', profitRate);
    },
  }
}

/* Initialize with key and secret */
let Arbitrage = new arbitrage();
export default Arbitrage;
