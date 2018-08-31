// @flow

import 'babel-polyfill';

import express from 'express';
import http from 'http';
import arbitrageRouter from 'controllers/arbitrageRouter';
import currencyRouter from 'controllers/currencyRouter';
import coinbaseRouter from 'controllers/coinbaseRouter';
import gdaxRouter from 'controllers/gdaxRouter';
import twitterRouter from 'controllers/twitterRouter';


if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

let app = express();

/* Creates server and web socket */
const server = http.createServer(app);

/* Set up apps with routers and their root URLs here */
app.use('/arbitrage', arbitrageRouter);
app.use('/currency', currencyRouter);
app.use('/coinbase', coinbaseRouter);
app.use('/twitter', twitterRouter);
app.use('/gdax', gdaxRouter);


/* Initialize server locally */
server.listen(process.env.PORT, async(error) => {
  if (error) {
    console.log(`Error initializing server: ${error}`);
  }
  console.log(`Server is ready on http://localhost:${process.env.PORT}`);
});
