import { findDayString, findMonthString } from '../utils/shared_constants.js';

/**
* Schedules the clock for updates every 500 milliseconds
*
* @param{null}, @return{null}
*/
export default function scheduleClockUpdate() {
  displayTime();
  setInterval(displayTime, 500 /** milliseconds */);
}

/**
* Displays a ticking clock on the schedule page
*
* @param{null}, @return{null}
*/
function displayTime() {
  const date = new Date();
  const timeAndDate = createTimeString(date) + '<br><br>' + createDateString(date);
  document.getElementById('dater').innerHTML = timeAndDate;
}

/**
* Create a formatted HH:mm:ss time string for the current time
*
* @param{DateObject} date
* @return{String} timeString}
*/
function createTimeString(date) {
  let [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  [minutes, seconds] = [padDigitIfNecessary(minutes), padDigitIfNecessary(seconds)];
  const timeString = hours + ":" + minutes + ":" + seconds;
  return timeString;
}

/**
* Create a formatted string for the current date
*
* @param{DateObject} date
* @return{null}
*/
function createDateString(date) {
  const day = findDayString(date.getDay());
  const month= findMonthString(date.getMonth());
  const numericalDate = date.getDate();
  const year = date.getFullYear();

  const dateString = day + " " + month + " " + numericalDate + " " + year;
  return dateString;
}

/**
* Add a leading zero to a digit if it is less than 10
*
* @param{Number} digit
* @return{String} ()
*/
function padDigitIfNecessary(digit) {
  return digit < 10 ? "0" + digit : digit;
}
