import moment from 'moment-timezone';

function timeLog(req, res, next) {
  console.log('> Time:', moment().tz('America/New_York').format('LLLL'));
  next();
}

export default timeLog;
