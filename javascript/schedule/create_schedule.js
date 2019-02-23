import { weekTable } from './listeners/schedule_by_day.js';

/*
* Takes the formatted parse data and sets the title on the "titler"
* elements.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
export function renderTitlesOnSchedule(formattedParseData) {
  const scheduleTable = document.getElementById("TODAY");
  const titlers = scheduleTable.querySelectorAll(".titler");
  titlers.forEach((titler, i) => {
    const title = formattedParseData[i].title;
    titler.innerHTML = title;
  });
}

export function determineDayOfTheWeekForSchedule() {

}

// export function setCurrentDayOnInitialPageLoad() {
//   const today = new Date();
//   const currentDayOfTheWeek = t
// }
