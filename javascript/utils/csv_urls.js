const FIRST_PART_OF_URL_DEV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?gid=';
const SECOND_PART_OF_URL_DEV = '&single=true&output=csv';

// Todo: fill in with the production schedule url.
const FIRST_PART_OF_URL_PROD = '';
const SECOND_PART_OF_URL_PROD = '';

const DAYS_OF_THE_WEEK = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thusday',
	'friday',
	'saturday'
]

const CSV_SHEET_IDS_DEV = [
	/*SUNDAY*/ '845076906',
	/*MONDAY*/ '0',
	/*TUESDAY*/ '580064975',
	/*WEDNESDAY*/ '1447255775',
	/*THURSDAY*/ '326821657',
	/*FRIDAY*/ '677702322',
	/*SATURDAY*/ '1613981700',
]

const CSV_SHEET_IDS_PROD = [
	/*SUNDAY*/ '',
	/*MONDAY*/ '',
	/*TUESDAY*/ '',
	/*WEDNESDAY*/ '',
	/*THURSDAY*/ '',
	/*FRIDAY*/ '',
	/*SATURDAY*/ '',
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

export function createCSVSheetURLsByDay() {
	let firstPartOfUrl, secondPartOfUrl, idNumbers;

	if(areYouInDevelopment) {
		[firstPartOfUrl, secondPartOfUrl, idNumbers] = [FIRST_PART_OF_URL_DEV, SECOND_PART_OF_URL_DEV, CSV_SHEET_IDS_DEV];
	} else {
		[firstPartOfUrl, secondPartOfUrl, idNumbers] = [FIRST_PART_OF_URL_PROD, SECOND_PART_OF_URL_PROD, CSV_SHEET_IDS_PROD]
	}

	const csvSheetURLsByDay = {};
	DAYS_OF_THE_WEEK.forEach( (day, i) =>{
		csvSheetURLsByDay[day] = firstPartOfUrl + idNumbers[i] + secondPartOfUrl;
	});

	console.log(csvSheetURLsByDay);
	return csvSheetURLsByDay;
}

// export const scheduleURLS_Dev = {
// 	SUNDAY: first + '845076906' + second;
// 	MONDAY = first + '0' + second;
// 	TUESDAY = first + '580064975' + second;
// 	WEDNESDAY = first + '1447255775' + second;
// 	THURSDAY = first + '326821657' + second;
// 	FRIDAY = first + '677702322' + second;
// 	SATURDAY = first + '1613981700' + second;
// };
// const SUNDAY = first + '845076906' + second;
// // The MONDAY url is used in the filename_playback_test.js
// export const MONDAY = first + '0' + second;
// const TUESDAY = first + '580064975' + second;
// const WEDNESDAY = first + '1447255775' + second;
// const THURSDAY = first + '326821657' + second;
// const FRIDAY = first + '677702322' + second;
// const SATURDAY = first + '1613981700' + second;
