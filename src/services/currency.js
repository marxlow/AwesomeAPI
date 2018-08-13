//@flow

import axios from 'axios';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Using Currency Layer API. Docs at: https://currencylayer.com/quickstart
const accessKey = process.env.CURRENCY_LAYER_KEY;

// Create instance of axios for calling currency Layer API
const request = axios.create({

});

function currency() {
  this.exchange = {
    getLive: async () => {
      const url = `http://www.apilayer.net/api/live?access_key=${accessKey}`;
      const response = await request.get(url);
      const data = response.data;
      const quotes = data.quotes;

      for (var currency in quotes) {

      }
    //   console.log('> Response:', quotes);
      return quotes;
    },
  }
}

/* Initialize with key and secret */
let Currency = new currency();
export default Currency;
