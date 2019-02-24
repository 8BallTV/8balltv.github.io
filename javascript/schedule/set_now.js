currentQuarterimport { dayLinks }from './listeners/schedule_by_day.js';
import { DAYS_OF_THE_WEEK } from '../utils/shared_constants.js';
import { calculateMinutesPastMidnight } from '../utils/time.js';
import { findCurrentClipIndex } from '../parser/format_parse_data.js';
import { findTodayDayString } from '../utils/shared_constants.js';
import scheduleSecondAndSubsequentActions from '../utils/scheduler.js';


export default function scheduleSetNowTextOnCurrentClipQuarter() {
  setOrRemoveNowText();
  scheduleSecondAndSubsequentActions(setOrRemoveNowText, null);
}

let currentQuarter = null;
export function setOrRemoveNowText() {
  const currentClipQuarter = findCurrentClipQuarter();
  if(isSelectedQuarterTheCurrentDay()) {
    currentQuarter = currentClipQuarter.innerHTML;
    currentClipQuarter.innerHTML = "..NOW.....";
  } else {
    currentClipQuarter.innerHTML = currentQuarter;
  }
}

function findCurrentClipQuarter() {
  const quarters = document.querySelectorAll(".quarter");
  const date = new Date();
  const minutesPastMidnight = calculateMinutesPastMidnight(date);
  const currentClipIndex = findCurrentClipIndex(minutesPastMidnight);
  const currentClipQuarter = quarters[currentClipIndex];

  return currentClipQuarter;
}

function isSelectedQuarterTheCurrentDay() {
  const selectedQuarter = document.querySelector(".selected");
  const todayDayString = findTodayDayString();
  return selectedQuarter.id === todayDayString;
}
