export const DAYS_OF_THE_WEEK = [
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday'
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
* Given an index that corresponds to an array that lists days from
* Sunday through Saturday, return an index that corresponds to an array
* that lists days from Monday to Sunday.
*
* @param{Number} sundayThroughSaturdayIndex
* @return{Number} mondayToSundayIndex
*/
export function findMondayToSundayIndex(sundayThroughSaturdayIndex) {
  const mondayToSundayIndex = (sundayThroughSaturdayIndex + 1) % 7;
  return mondayToSundayIndex;
}
