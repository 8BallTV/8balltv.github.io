export function calculateMinutesPastMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}

/* Returns number of milliseconds to wait until querying for new clip
 *		pararms:
 *     Date: javascript Date Object
 *			Boolean test: true if in testing mode, false if in production
 */
export function findMillisecondsToQueryForNewClip(date, test) {
  if (!test) {
    date = new Date();
  }
  const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
  const secondsUntilNextQuery = (15 - (minutes % 15)) * 60 - seconds;
  return secondsUntilNextQuery * 1000;
}


export function isItMidnight(date) {
  return date.getMinutes() === 0 && date.getHours() === 0;
}
