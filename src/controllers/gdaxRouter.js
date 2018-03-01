//@flow

import express from 'express';
import gdax from 'services/gdax';
import timeLog from 'utils/timeLog';

let gdaxRouter = express.Router();

gdaxRouter.use(timeLog); // Logs the time when the gdaxRouter is called

/* Define routes */
gdaxRouter.get('/prices/:currency', async (req, res) => {
  try {
    const { currency } = req.params;
    const result = await gdax.prices.getSpotAll({ currency });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



export default gdaxRouter;
