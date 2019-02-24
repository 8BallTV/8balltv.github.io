import { findTodayDayString } from '../utils/shared_constants.js';
import findCurrentQuarter  from '../utils/now_text.js';
import scheduleSecondAndSubsequentActions from '../utils/scheduler.js';

let currentQuarterHTML = "";
const nowText = "..NOW.....";

export default function scheduleNowTextUpdates() {
  setNowText();
  scheduleSecondAndSubsequentActions(setNowText);
}

export function setNowText() {
  resetPreviousQuarter();
  updateCurrentQuarter();
}

export function removeNowText() {
  const currentQuarter = findCurrentQuarter();
  currentQuarter.innerHTML = currentQuarterHTML;
}

function resetPreviousQuarter() {
  const previousQuarter = document.querySelector(".current-quarter");
  if(previousQuarter) {
    previousQuarter.classList.remove("current-quarter");
    previousQuarter.innerHTML = currentQuarterHTML;
  }
}

function updateCurrentQuarter() {
  const currentQuarter = findCurrentQuarter();
  currentQuarterHTML = currentQuarter.innerHTML;
  currentQuarter.classList.add("current-quarter");
  currentQuarter.innerHTML = nowText;
}
