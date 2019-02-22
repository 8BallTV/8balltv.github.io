/*
* Schedules the clock for updates every 500 milliseconds
*
* @param{null}, @return{null}
*/
export default function scheduleClockUpdate() {
  setInterval(displayTime, 500 /* milliseconds */);
}

/*
* Displays a ticking clock on the schedule page
*
* @param{null}, @return{null}
*/
function displayTime() {
  const time = new Date();
  document.getElementById('dater').innerHTML = createTimeString(time);
}

/*
* Create a formatted HH:mm:ss time string for the current time
*
* @param{Number} time
* @return{null}
*/
function createTimeString(time) {
  let [hours, minutes, seconds] = [time.getHours(), time.getMinutes(), time.getSeconds()];
  [minutes, seconds] = [padDigitIfNecessary(minutes), padDigitIfNecessary(seconds)];
  const timeString = hours + ":" + minutes + ":" + seconds;
  return timeString;
}

/*
* Add a leading zero to a digit if it is less than 10
*
* @param{Number} digit
* @return{String} ()
*/
function padDigitIfNecessary(digit) {
  return digit < 10 ? "0" + digit : digit;
}
