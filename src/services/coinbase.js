//@flow

import axios from 'axios';

const request = axios.create({

});

function coinbase() {

  this.prices = {
    // Returns the current prices of all available currencies from Coinbase
    getSpotAll: async({ currency }) => {
      if (currency.toUpperCase() !== 'USD') {
        throw new ('Error: We only allow USD for now');
      }
      const url: string = `https://api.coinbase.com/v2/prices/${currency}/spot`;
      const response: object = await request.get(url);
      const data: array<any> = response.data.data;
      let result: object  = { };
      for (let i = 0; i < data.length; i ++) {
        result[data[i].base] = `$${parseFloat(data[i].amount).toFixed(2)} ${data[i].currency}`;
      }
      return result;
    },
  }
}

const Coinbase = new coinbase();
export default Coinbase;
