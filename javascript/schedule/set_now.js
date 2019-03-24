import { findTodayDayString } from '../utils/shared_constants.js';
import findCurrentQuarter  from '../utils/now_text.js';
import scheduleSecondAndSubsequentActions from '../utils/scheduler.js';
import { findTodayDayLink } from './create_schedule.js';
import { clearSchedulerTasks } from '../utils/scheduler.js';

let currentQuarterHTML = "";

/**
* @author samdealy
* @description Schedule nowText to update as time progresses
* @return {null}
*/
export default function scheduleNowTextUpdates() {
  /*
  * We clear all scheduled "setNowText" async tasks. If we don't, the user
  * could navigate to another day's tab, then return to today's tab, which would
  * result in unecessary (and conflictiing) future actions scheduled.
  */
  clearSchedulerTasks(/*functionName*/ "setNowText");
  setNowText();
  scheduleSecondAndSubsequentActions(setNowText);
}

/**
* @author samdealy
* @description Update the previous nowText quarter and set the current quarter to display the nowText
*   NOTE: A "quarter" is the className for  a <td> element that contains the time.
*        They are divided into 15 minute intervals, hence the name "quarter".
* @return {null}
*/
function setNowText() {
  resetPreviousQuarter();
  updateCurrentQuarter();
}

/**
* @author samdealy
* @description Remove the now text on the currentQuarter
* @param {null}
* @return {null}
*/
export function removeNowText() {
  const currentQuarter = findCurrentQuarter();
  currentQuarter.innerHTML = currentQuarterHTML;
}

/**
* @author samdealy
* @description Reset the previous quarter's text to be the appropriate time
* @param {null}
* @return {null}
*/
function resetPreviousQuarter() {
  const previousQuarter = document.querySelector(".current-quarter");
  if(previousQuarter) {
    previousQuarter.classList.remove("current-quarter");
    previousQuarter.innerHTML = currentQuarterHTML;
  }
}

/**
* @author samdealy
* @description Make the current quarter display the now text.
* @param {null}
* @return {null}
*/
function updateCurrentQuarter() {
  const currentQuarter = findCurrentQuarter();
  currentQuarterHTML = currentQuarter.innerHTML;
  // Makes sure that only the current day's quarters will have the
  // now text applied.
  if(isTodaySelected()) {
    currentQuarter.classList.add("current-quarter");
    currentQuarter.innerHTML = "..NOW.....";
  }
}

/**
* @author samdealy
* @description Checks that the currently selected day is today.
* @param {null}
* @return {null}
*/
function isTodaySelected() {
  return findTodayDayLink().classList.contains("selected");
}
