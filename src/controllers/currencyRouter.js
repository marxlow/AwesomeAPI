//@flow

import Currency from 'services/currency';
import express from 'express';
import timeLog from 'utils/timeLog';

let currencyRouter = express.Router();

currencyRouter.use(timeLog); // Logs the time when the currencyRouter is called

/* Define routes */
currencyRouter.get('/exchange/live/USD', async (req, res) => {
  try {
    const result = await Currency.exchange.getLive();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default currencyRouter;
