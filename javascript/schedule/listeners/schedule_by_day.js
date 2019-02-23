import parseCSV from '../../parser/index.js';
import { renderTitlesOnSchedule } from '../create_schedule.js';
import determineCSV_URL from '../../utils/csv_urls.js';

export const weekTable = document.getElementById("WEEK");

export default function registerSchedulesByDayLinks() {
  const dayLinks = weekTable.querySelectorAll("td");
  dayLinks.forEach((dayLink, i) => {
    dayLink.addEventListener('click', e => {
      setIsToday(dayLink);

      const csv_url = determineCSV_URL((i + 1) % 7);
      parseCSV(renderTitlesOnSchedule, csv_url);
    });
  });
}

function setIsToday(dayLink) {
  updateIsTodayOnPrevious();
  dayLink.className = "isToday";
}

function updateIsTodayOnPrevious() {
  const previousIsToday = weekTable.querySelector(".isToday");
  if(previousIsToday) {
    previousIsToday.className = "week";
  }
}
