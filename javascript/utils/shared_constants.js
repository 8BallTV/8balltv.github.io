export const DAYS_OF_THE_WEEK = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
];

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
* Find the lowercase string that represents today's day.
* 	e.g. If today is Saturday, April 10th, this returns "saturday"
*
* @param{Null}
* @return{String} dayString
*/
export function findTodayDayString() {
	const dayNumber = (new Date()).getDay();
	return DAYS_OF_THE_WEEK[dayNumber];
}
/**
* Given a number in the range [0, 6], return a string that represents
* that numbers day. We have to do this because Date#getDay returns
* 0 for Sunday, 1 for Monday, ... 6 for Saturday.
*
* @param{Number} dayNumber
* @return{String} dayString
*/
export function findDayString(dayNumber) {
	return DAYS_OF_THE_WEEK[dayNumber];
}

export function findMonthString(monthNumber) {
	return MONTHS[monthNumber];
}
