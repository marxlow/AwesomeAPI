//@flow

import axios from 'axios';

// if (process.env.NODE_ENV === 'local') {
//   require('dotenv').config();
// }

require('dotenv').config();

/* Create instance of axios for calling Twitter API*/
const request = axios.create({
  // baseUrl: `https://api.twitter.com/1.1/`,
  auth: {
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  }
});

function twitter() {

  this.user = {
    getTweets: async ({ user_name, count}) => {
      const url = `https://api.twitter.com/1.1/statuses/user_timeline.json`;
      const params = {
        count: count,
        screen_name: user_name,
        include_rts: false, // No retweets! We only want the real stuff
        trim_user: true, // Ignores user data
        excluse_replies: true, // Replies of User to others... We don't want that
      };
      console.log('> key:', process.env.TWITTER_KEY)
      console.log('> Your params:', user_name, count);
      const response = await request.get(url, { params });
      console.log('> Response:', response);
    },
  }
}

/* Initialize with key and secret */
let Twitter = new twitter();
export default Twitter;
