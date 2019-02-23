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

export const MONDAY_THROUGH_SUNDAY = createMondayThroughSunday();

function createMondayThroughSunday() {
  const mondayThroughSunday = DAYS_OF_THE_WEEK.slice();
  const sunday = mondayThroughSunday.shift();
  mondayThroughSunday.push(sunday);

  return mondayThroughSunday;
}
