const FIRST_PART_OF_SCHEDULE_URL_DEV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWNwSz/pub?gid=';
const SECOND_PART_OF_SCHEDULE_URL_DEV = '&single=true&output=csv';

/* ID numbers for the specific sheets on the dev schedule */
const CSV_SHEET_IDS_DEV = [
	/*SUNDAY*/ '845076906',
	/*MONDAY*/ '0',
	/*TUESDAY*/ '580064975',
	/*WEDNESDAY*/ '1447255775',
	/*THURSDAY*/ '326821657',
	/*FRIDAY*/ '677702322',
	/*SATURDAY*/ '1613981700',
]

const DEV_CONSTANTS = [FIRST_PART_OF_SCHEDULE_URL_DEV, SECOND_PART_OF_SCHEDULE_URL_DEV, CSV_SHEET_IDS_DEV];
export default DEV_CONSTANTS;
