//@flow

import Twitter from 'services/twitter';
import express from 'express';
import timeLog from 'utils/timeLog';

let twitterRouter = express.Router();

twitterRouter.use(timeLog); // Logs the time when the twitterRouter is called

/* Define routes */
twitterRouter.get('/:user_name/tweets/:count', async (req, res) => {
  try {
    const { user_name, count } = req.params;
    const result = await Twitter.user.getTweets({ user_name, count });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



export default twitterRouter;
