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
  const date = new Date();
  document.getElementById('dater').innerHTML = createTimeString(date)+ \
                                              '<br><br>' + time;
}

/*
* Create a formatted HH:mm:ss time string for the current time
*
* @param{DateObject} date
* @return{null}
*/
function createTimeString(date) {
  let [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  [minutes, seconds] = [padDigitIfNecessary(minutes), padDigitIfNecessary(seconds)];
  const timeString = hours + ":" + minutes + ":" + seconds;
  return timeString;
}

function createDateString(date) {
  
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
