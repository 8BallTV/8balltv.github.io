import parseTSV from '../../parser/index.js';
import renderTitlesOnSchedule from '../create_schedule.js';
import determineTSV_URL from '../../utils/tsv_urls.js';
import { findTodayDayString } from '../../utils/shared_constants.js';
import setOrRemoveNowText from '../set_now.js';

export const weekTable = document.getElementById("WEEK");
// A day link brings us to another day's schedule
export const dayLinks = weekTable.querySelectorAll("td");

/**
* For each day link, register an on-click listener.
*
* @param{null}, @return{null}
*/
export default function registerSchedulesByDayLinksListener() {
  dayLinks.forEach((dayLink, i) => {
    dayLink.addEventListener('click', e => {
      styleTodayLinkAndParseTodaysSchedule(dayLink);
    });
  });
}

/**
* Adds the "selected" css class for the selected day link and parse
* that day's tsv file.
*
* @param{DOMElement} dayLink
* @return{Number} mondayToSundayIndex
*/
function styleTodayLinkAndParseTodaysSchedule(dayLink) {
  setSelected(dayLink);
  setOrRemoveNowText();
  const dayString = dayLink.id;
  const tsv_url = determineTSV_URL(dayString);
  parseTSV(renderTitlesOnSchedule, tsv_url);
}

/**
* Clear the  "selected" css class on the previously selected day link
* and add the "selected" css class to the currently selected day link.
*
* @param{DOMElement} dayLink
* @return{null}
*/
function setSelected(dayLink) {
  clearSelectedOnPrevious();
  dayLink.className = "selected";
}

/**
* Clear the  "selected" css class on the previously selected day link.
*
* @param{null}, @return{null}
*/
function clearSelectedOnPrevious() {
  const previousSelected = weekTable.querySelector(".selected");
  if(previousSelected) {
    previousSelected.className = "week";
  }
}
