//@flow

import WebSocket from 'ws';
import axios from 'axios';
import throttle from 'lodash/throttle';

const request = axios.create({

});

const GDAX_PRODUCTS: array<string> = ['BTC', 'ETH', 'LTC']; // GDAX API Does not support BCH atm.

function gdax() {

  this.prices = {
    // Returns the current prices of all available currencies from Coinbase
    getSpotAll: async ({ currency }) => {
      if (currency.toUpperCase() !== 'USD') {
        throw new ('Error: We only allow USD for now');
      }
      let result: object = {};
      for (let i = 0; i < GDAX_PRODUCTS.length; i++) {
        const product = appendCurrency(GDAX_PRODUCTS[i]); // from BTC to BTC-USD
        const url: string = `https://api-public.sandbox.gdax.com/products/${product}/trades`;
        const response: object = await request.get(url);
        const data: array<any> = response.data;
        result[GDAX_PRODUCTS[i]] = `$${parseFloat(data[0].price).toFixed(2)} USD`;
      }
      return result;
    },

  }
}

// For WebSocket
function initializeServer(currency) {
  const ws = new WebSocket('wss://ws-feed.gdax.com');
  ws.on('open', (() => {
    console.log('> Server has opened. Here is the date now.');
    ws.send(Date.now());
  }));
  ws.on('close', (() => {
    console.log('> Server has closed. Here is the date now in console.', Date.now());
  }));
  /* Runs throttle function every 500 milliseconds */
  ws.on('message', throttle((gdaxData) => {
    console.log('> This is your Gdax Data:', gdaxData);
  }, 500));
}

/*
 * If a currency does not end with 'USD', add 'USD' string to it.
*/
function appendCurrency(currency) {
  const currencyArray = currency.split('-');
  
  if (currencyArray[1] !== 'USD') {
    return `${currency}-USD`;
  }
  return currency;
}

const Gdax = new gdax();
export default Gdax;
