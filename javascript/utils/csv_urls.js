import DEV_CONSTANTS from './dev_constants.js';
import PROD_CONSTANTS from './prod_constants.js';

const DAYS_OF_THE_WEEK = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thusday',
	'friday',
	'saturday'
]

let areYouInDevelopment = window.location.hostname === 'localhost';

/*
* Returns correct url for the current day of the week.
*
* @param {Number} dayOfTheWeek
* @return {String} (URL)
*/
export default function determineCSV_URL() {
	const date = new Date();
	const dayOfTheWeek = date.getDay();
	const csvSheetURLsByDay = createCSVSheetURLsByDay();

	switch(dayOfTheWeek) {
    case 0: return csvSheetURLsByDay.sunday;
    case 1: return csvSheetURLsByDay.monday;
    case 2: return csvSheetURLsByDay.tuesday;
    case 3: return csvSheetURLsByDay.wednesday;
    case 4: return csvSheetURLsByDay.thursday;
    case 5: return csvSheetURLsByDay.friday;
    case 6: return csvSheetURLsByDay.saturday;
  }
}

/*
* Creates an object that holds the url for each day's sheet. If in
* development, uses the development schedule's Google Sheet. If in
* production, uses the production schedule's Google Sheet.
*
* @param{null}
* @return{Object} csvSheetURLsByDay
*/
export function createCSVSheetURLsByDay() {
  let [firstPartOfUrl, secondPartOfUrl, idNumbers] = determineConstants();
	const csvSheetURLsByDay = {};
	DAYS_OF_THE_WEEK.forEach( (day, i) =>{
		csvSheetURLsByDay[day] = firstPartOfUrl + idNumbers[i] + secondPartOfUrl;
	});
	return csvSheetURLsByDay;
}

/*
* Determines which array of constants to use.
*
* @param{null}
* @return {Array<String>} ()
*/
function determineConstants() {
	return areYouInDevelopment ? DEV_CONSTANTS : PROD_CONSTANTS;
}
