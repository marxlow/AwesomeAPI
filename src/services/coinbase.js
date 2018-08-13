//@flow

import axios from 'axios';

const request = axios.create({

});

function coinbase() {

  this.prices = {
    // Returns the current prices of all available currencies from Coinbase
    getSpotAll: async(currency) => {
      if (currency.toUpperCase() !== 'USD') {
        throw new Error('Error: We only allow USD for now');
      }
      const url: string = `https://api.coinbase.com/v2/prices/${currency}/spot`;
      const response: object = await request.get(url);
      const data: array<any> = response.data.data;
      let result: object  = { };
      for (let i = 0; i < data.length; i ++) {
        result[data[i].base] = `${parseFloat(data[i].amount).toFixed(2)}`;
      }
      return result;
    },
  },

  this.exchanges = {
    // Returned rates will define the exchange rate for one unit of the base currency
    get: async(currency) => {
      if (currency.length === 0) {
        throw new Error('Currency empty');
      }
      const url: string = `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`;
      const response: object = await request.get(url);
      const data: array<any> = response.data.data;
      const rates = data.rates;
      return rates;
    } 
  }
}

const Coinbase = new coinbase();
export default Coinbase;
