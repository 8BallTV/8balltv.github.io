/**
 * @author samdealy
 * @description Finds the number of milliseconds between the current time and the
 * start of the next 15 minute interval.
 *   e.g. If it's 4:12:20pm, then the start of the next 15 minute
 *       interval is 4:15:00pm. So there's 2 minutes and 40 seconds
 *       until the next 15 minute interval, which means we'd return
 *       (2min * 60sec/min + 40sec) * 1000 ms/sec = 160,000ms
 * @param {DateObject} date
 * @param {Boolean} test - set to true if you're running a test
 * @return {Number} milliSecondsUntilNextQuery
 */
export function findMillisecondsUntilNext15MinuteInterval(date, test) {
    if (!test) {
        date = new Date();
    }
    const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
    const secondsUntilNextQuery = (15 - (minutes % 15)) * 60 - seconds;
    return secondsUntilNextQuery * 1000;
}

/**
 * @author samdealy
 * @description Calculates minutes past midnight for a given date object
 * @param {DateObject} date
 * @return {Number} (minutesPastMidnight)
 */
export function calculateMinutesPastMidnight(date) {
    return date.getHours() * 60 + date.getMinutes();
}

/**
 * @author samdealy
 * @description Determines if the date represents midnight
 * @param {DateObject} date
 * @return {Boolean} (true if it's midnight)
 */
export function isItMidnight(date) {
    return date.getMinutes() === 0 && date.getHours() === 0;
}


/**
 * @author bhaviksingh
 * @description Returns a readable string for a given number of minutes, for eg: 150 -> "2h 30m"
 * @param {Number} minutes 
 * @return {String} readableTIme
 */
export function convertMinutesToReadableTime(minutes) {

    let hours = Math.floor(minutes / 60);
    let readableHours = hours == 0 ? "" : hours.toString() + "h";

    let minuteRollOver = minutes % 60;
    let readableMinutes = minuteRollOver == 0 ? "" : minuteRollOver.toString() + "m";

    let readableTime = readableHours + " " + readableMinutes;
    return readableTime;
}