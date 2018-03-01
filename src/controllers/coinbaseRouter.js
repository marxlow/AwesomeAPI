//@flow

import Coinbase from 'services/coinbase';
import express from 'express';
import timeLog from 'utils/timeLog';

let coinbaseRouter = express.Router();

coinbaseRouter.use(timeLog); // Logs the time when the coinbaseRouter is called

/* Define routes */
coinbaseRouter.get('/prices/:currency', async (req, res) => {
  try {
    const { currency } = req.params;
    const result = await Coinbase.prices.getSpotAll({ currency });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



export default coinbaseRouter;
