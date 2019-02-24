import { weekTable } from './listeners/schedule_by_day.js';
import { calculateMinutesPastMidnight } from '../utils/time.js';
import { findTodayDayString } from '../utils/shared_constants.js';
import { findCurrentClipIndex } from '../parser/format_parse_data.js';

/**
* Takes the formatted parse data and sets the title on the "titler"
* elements.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
export default function renderTitlesOnSchedule(formattedParseData) {
  const scheduleTable = document.getElementById("TODAY");
  const titlers = scheduleTable.querySelectorAll(".titler");
  titlers.forEach((titler, i) => {
    const title = formattedParseData[i].title;
    titler.innerHTML = title;
  });
}

export function setSelectedCSS() {
  const todayDayLink = findTodayDayLink();
  todayDayLink.className = "selected"
}

/**
* Find the day link for today
*
* @param{Null}
* @return{String} todayDayLink
*/
function findTodayDayLink() {
  const todayDayString = findTodayDayString();
  const todayDayLink = document.getElementById(todayDayString);
  return todayDayLink;
}
