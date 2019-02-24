import DEV_CONSTANTS from './dev_constants.js';
import PROD_CONSTANTS from './prod_constants.js';
import { DAYS_OF_THE_WEEK } from './shared_constants.js';

let areYouInDevelopment = window.location.hostname === 'localhost';
/**
* Returns correct url for the current day of the week.
*
* @param {Number} dayOfTheWeek
* @return {String} (URL)
*/
export default function determineTSV_URL(dayOfTheWeek) {
	const tsvSheetURLsByDay = createTSVSheetURLsByDay();
	switch(dayOfTheWeek) {
    case 0: return tsvSheetURLsByDay.sunday;
    case 1: return tsvSheetURLsByDay.monday;
    case 2: return tsvSheetURLsByDay.tuesday;
    case 3: return tsvSheetURLsByDay.wednesday;
    case 4: return tsvSheetURLsByDay.thursday;
    case 5: return tsvSheetURLsByDay.friday;
    case 6: return tsvSheetURLsByDay.saturday;
  }
}

/**
* Creates an object that holds the url for each day's sheet. If in
* development, uses the development schedule's Google Sheet. If in
* production, uses the production schedule's Google Sheet.
*
* @param{null}
* @return{Object} tsvSheetURLsByDay
*/
export function createTSVSheetURLsByDay() {
	let [firstPartOfUrl, secondPartOfUrl, idNumbers] = determineConstants();
	const tsvSheetURLsByDay = {};
	DAYS_OF_THE_WEEK.forEach( (day, i) => {
		tsvSheetURLsByDay[day] = firstPartOfUrl + idNumbers[i] + secondPartOfUrl;
	});
	return tsvSheetURLsByDay;
}

/**
* Determines which array of constants to use.
*
* @param{null}
* @return {Array<String>} ()
*/
function determineConstants() {
	return areYouInDevelopment ? DEV_CONSTANTS : PROD_CONSTANTS;
}
