//@flow

import 'babel-polyfill';

import express from 'express';
import http from 'http';
import twitterRouter from 'controllers/twitterRouter';

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

let app = express();

/* Set up apps with routers */
app.use('/twitter', twitterRouter);


/* Set up server */
const server = http.createServer(app);


/* Initialize server locally */
server.listen(process.env.PORT, async(error) => {
  if (error) {
    console.log(`Error initializing server: ${error}`);
  }
  console.log(`Server is ready on http://localhost:${process.env.PORT}`);
});
