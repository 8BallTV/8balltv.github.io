/**
* Finds the number of milliseconds between the current time and the
* start of the next 15 minute interval.
*   e.g. If it's 4:12:20pm, then the start of the next 15 minute
*       interval is 4:15:00pm. So there's 2 minutes and 40 seconds
*       until the next 15 minute interval, which means we'd return
*       (2min * 60sec/min + 40sec) * 1000 ms/sec = 160,000ms
*
*/
export function findMillisecondsUntilNext15MinuteInterval(date, test) {
  if (!test) {
    date = new Date();
  }
  const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
  const secondsUntilNextQuery = (15 - (minutes % 15)) * 60 - seconds;
  return secondsUntilNextQuery * 1000;
}

/** Calculates minutes past midnight for a given date object
* @param {DateObject} date
* @return {Number} (minutesPastMidnight)
*/
export function calculateMinutesPastMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}

/**
* Determines if the date represents midnight
* @param {DateObject} date
* @return {Boolean} (true if it's midnight)
*/
export function isItMidnight(date) {
  return date.getMinutes() === 0 && date.getHours() === 0;
}
