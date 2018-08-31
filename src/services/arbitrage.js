
import Coinbase from './coinbase';
import axios from 'axios';

// TODO: Refactor request into a helper function
const request = axios.create({

});

// Arbitrary chosen, for testing.
const PRECISION = 8;

function arbitrage() {
  // Use Bitcoin (on Coinbase), SGD, USD as elements in the Arbitrage
  this.btc = {
    calculate: async (capital) => {
      let profitRate = 0;
      let capitalCurrency = ''; // Currency which user should use to purchase BTC
      let otherCurrency = ''; // Currency which user should sell BTC for
      let capitalToBtc = 0; 
      let btcToOther = 0;
      let otherToCapital = 0;

      // Get exchange rate of SGD with 1 USD
      const currencyExchangeRates = await Coinbase.exchanges.get('USD');
      const usdToSgd = currencyExchangeRates['SGD'];
      const sgdToUsd = (1 / usdToSgd).toFixed(PRECISION);
      // Get exchange rate of 1 USD for 1 BTC in coinbase
      const usdCryptoPrices = await Coinbase.prices.getSpotAll('USD');
      const btcToUsd =  usdCryptoPrices['BTC'];
      const usdToBtc = (1 / btcToUsd).toFixed(PRECISION);
      // Get exchange rate of 1 SGD for 1 BTC in Singapore market (API returns 8 dp)
      const sgdBtcExchangeRates = await request.get('https://blockchain.info/ticker');
      const btcToSgd = sgdBtcExchangeRates.data['SGD'].last;
      const sgdToBtc = (1/ btcToSgd).toFixed(PRECISION);
      /* Calculate potential profit from following steps if any
       * 1. USD buys "x" BTC on "coinbase"
       * 2. BTC sells for "y" SGD on "Singapore Market"
       * 3. "y" SGD converts back to USD
      */
      const btcSoldForSgd = usdToBtc * btcToSgd;
      const usdRevenue = btcSoldForSgd * sgdToUsd;
      profitRate = (usdRevenue - 1).toFixed(PRECISION);
      capitalCurrency = 'USD';
      otherCurrency = 'SGD';
      capitalToBtc = usdToBtc;
      btcToOther = btcToSgd;
      otherToCapital = sgdToUsd;
      if (profitRate < 0 ) {
        /* Reverse Arbitrage by starting with 1 SGD,
         * 1. SGD buys "x" BTC on "Singapore Market"
         * 2. BTC sells for "y" USD on "Coinbase"
         * 3. "y" USD converts back to SGD
        */
        const btcSoldForUsd = sgdToBtc * btcToUsd;
        const sgRevenue = btcSoldForUsd * usdToSgd;
        profitRate = (sgRevenue - 1).toFixed(PRECISION);
        capitalCurrency = 'SGD';
        otherCurrency = 'USD';
        capitalToBtc = sgdToBtc;
        btcToOther = btcToUsd;
        otherToCapital = usdToSgd;
      }
      // console.log('> Profit:', profitRate);
      // console.log('> Capital currency:', capitalCurrency);
      // console.log('> Other currency:', otherCurrency);
      // console.log('> Capital to BTC', capitalToBtc);
      // console.log('> BTC to Other currency', btcToOther);
      // console.log('> Other currency to Capital', otherToCapital);
      return {
        profitRate,
        capitalCurrency,
        otherCurrency,
        capitalToBtc,
        btcToOther,
        otherToCapital,
      }
    },
  }
}

/* Initialize with key and secret */
let Arbitrage = new arbitrage();
export default Arbitrage;
