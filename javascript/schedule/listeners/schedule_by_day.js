import parseTSV from "../../parser/index.js";
import renderTitlesOnSchedule from "../create_schedule.js";
import determineTSV_URL from "../../utils/tsv_urls.js";
import { findTodayDayString } from "../../utils/shared_constants.js";
import scheduleNowTextUpdates, { removeNowText } from "../set_now.js";

/**
 Each day is a TD element in a table called "WEEK"
 In the registerScheduleByDayLinksListener, we add an event listener to each TD (ie: Day) 
*/
export const weekTable = document.getElementById("WEEK");
// A day link brings us to another day's schedule
export const dayLinks = weekTable.querySelectorAll("td");

/**
 * @author samdealy
 * @description For each day link, register an on-click listener.
 * @listens onClick
 * @param {null}
 * @return {null}
 */
export default function registerSchedulesByDayLinksListener() {
  dayLinks.forEach((dayLink, i) => {
    dayLink.addEventListener("click", (e) => {
      const clickedDay = e.currentTarget.id;
      styleLinkAndParseSchedule(dayLink);
      clickedDay == findTodayDayString()
        ? scheduleNowTextUpdates()
        : removeNowText();
    });
  });
}

/**
 * @author samdealy
 * @description Adds the "selected" css class for the selected day link and parse
 * that day's tsv file.
 * @param {DOMElement} dayLink
 * @return {Number} mondayToSundayIndex
 */
function styleLinkAndParseSchedule(dayLink) {
  setSelected(dayLink);
  const dayString = dayLink.id;
  const tsv_url = determineTSV_URL(dayString);
  parseTSV(renderTitlesOnSchedule, tsv_url);
}

/**
 * @author samdealy
 * @description Clear the  "selected" css class on the previously selected day link
 * and add the "selected" css class to the currently selected day link.
 * @param {DOMElement} dayLink
 * @return {null}
 */
function setSelected(dayLink) {
  clearSelectedOnPrevious();
  dayLink.className = "selected";
}

/**
 * @author samdealy
 * @description Clear the  "selected" css class on the previously selected day link.
 * @param {null}
 * @return {null}
 */
function clearSelectedOnPrevious() {
  const previousSelected = weekTable.querySelector(".selected");
  if (previousSelected) {
    previousSelected.className = "week";
  }
}
