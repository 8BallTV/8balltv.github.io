/** @const @type {Array<String>} */
export const DAYS_OF_THE_WEEK = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

/** @const @type {Array<String>} */
export const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

/**
* @author samdealy
* @description Find the lowercase string that represents today's day.
* 	e.g. If today is Saturday, April 10th, this returns "saturday"
* @param {null}
* @return {String} dayString
*/
export function findTodayDayString() {
	const dayNumber = (new Date()).getDay();
	return DAYS_OF_THE_WEEK[dayNumber];
}
/**
* @author samdealy
* @description Given a number in the range [0, 6], return a string that represents
* 	that number's day. We have to do this because Date#getDay returns
* 	0 for Sunday, 1 for Monday, ... 6 for Saturday.
* @param {Number} dayNumber
* @return {String} dayString
*/
export function findDayString(dayNumber) {
	return DAYS_OF_THE_WEEK[dayNumber];
}


/**
* @author samdealy
* @description Given a number in the range [0, 6], return a string that represents
* 	that number's month. We have to do this because Date#getMonth returns
* 	0 for January, 1 for February, ... 11 for December.
* @param {Number} dayNumber
* @return {String} dayString
*/
export function findMonthString(monthNumber) {
	return MONTHS[monthNumber];
}
