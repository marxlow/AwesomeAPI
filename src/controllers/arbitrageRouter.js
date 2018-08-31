import express from 'express';
import timeLog from 'utils/timeLog';
import Arbitrage from '../services/arbitrage';

let arbitrageRouter = express.Router();
arbitrageRouter.use(timeLog); // Logs the time when the currencyRouter is called

arbitrageRouter.get('/calculate', async (req, res) => {
  try {
    const result = await Arbitrage.btc.calculate();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default arbitrageRouter;