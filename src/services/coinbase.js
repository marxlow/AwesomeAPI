//@flow

import axios from 'axios';

const request = axios.create({

});

function coinbase() {

  this.prices = {
    getAll: async({ currency }) => {
      console.log('> Currency is:', currency);
      const url: string = `https://api.coinbase.com/v2/prices/${currency}/spot`;
      const response: object = await request.get(url);
      const data: array<any> = response.data.data;
      let result: object  = { };
      for (let i = 0; i < data.length; i ++) {
        result[data[i].base] = `$${data[i].amount} ${data[i].currency}`;
      }
      return result;
    },
  }
}

const Coinbase = new coinbase();
export default Coinbase;
