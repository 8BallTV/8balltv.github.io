/** @const @type {String} @todo TODO Fill this in when we have a prod schedule */
const FIRST_PART_OF_SCHEDULE_URL_PROD = '';

/** @const @type {String} @todo TODO Fill this in when we have a prod schedule*/
const SECOND_PART_OF_SCHEDULE_URL_PROD = '';

/**
* @const
* @type {Object<String, String>}
* @description ID numbers for the specific sheets on the prod schedule
*/
const TSV_SHEET_IDS_PROD = [
	/**SUNDAY*/ '',
	/**MONDAY*/ '',
	/**TUESDAY*/ '',
	/**WEDNESDAY*/ '',
	/**THURSDAY*/ '',
	/**FRIDAY*/ '',
	/**SATURDAY*/ '',
]

/**
* @const
* @type {Array<string, string, Object<string, string>}
* @description Used to determine each day's prod schedule URL
*/
const PROD_CONSTANTS = [FIRST_PART_OF_SCHEDULE_URL_PROD, SECOND_PART_OF_SCHEDULE_URL_PROD, TSV_SHEET_IDS_PROD];
export default PROD_CONSTANTS;
