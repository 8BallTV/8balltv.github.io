import parseCSV from '../../parser/index.js';
import renderTitlesOnSchedule from '../create_schedule.js';
import determineCSV_URL from '../../utils/csv_urls.js';

export const weekTable = document.getElementById("WEEK");

/*
* For each day link, register an on-click listener that clears the
* adds the "isToday" css class to the selected day, parses
* that day's csv file.
*
* @param{null}, @return{null}
*/
export default function registerSchedulesByDayLinksListener() {
  // A day link brings us to another day's schedule
  const dayLinks = weekTable.querySelectorAll("td");
  dayLinks.forEach((dayLink, i) => {
    dayLink.addEventListener('click', e => {
      setIsToday(dayLink);
      const csv_url = determineCSV_URL((i + 1) % 7);
      parseCSV(renderTitlesOnSchedule, csv_url);
    });
  });
}

/*
* Clear the  "isToday" css class on the previously selected day link
* and add the "isToday" css class to the currently selected day link.
*
* @param{DOMElement} dayLink
* @return{null}
*/
function setIsToday(dayLink) {
  updateIsTodayOnPrevious();
  dayLink.className = "isToday";
}

/*
* Clear the  "isToday" css class on the previously selected day link.
*
* @param{null}, @return{null}
*/
function updateIsTodayOnPrevious() {
  const previousIsToday = weekTable.querySelector(".isToday");
  if(previousIsToday) {
    previousIsToday.className = "week";
  }
}
