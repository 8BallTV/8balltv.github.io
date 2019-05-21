/** @const @type {String}
const FIRST_PART_OF_SCHEDULE_URL_PROD = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7EnR4fHqDgT3ZqXWXpl4xb7C4tv1PkEMHfxN5sGHponRwH36OALT_MrY3JLn3zPyrqr0oERerBob6/pub?gid=';

/** @const @type {String}
const SECOND_PART_OF_SCHEDULE_URL_PROD = '&single=true&output=tsv';

/**
* @const
* @type {Object<String, String>}
* @description ID numbers for the specific sheets on the prod schedule
*/

const TSV_SHEET_IDS_PROD = {
  monday: '192360482' ,
  tuesday: '1036455868',
  wednesday: '949173297',
  thursday: '483801566',
  friday: '228299691' ,
  saturday: '1694530893',
  sunday: '835076295',
};

/**
* @const
* @type {Array<string, string, Object<string, string>}
* @description Used to determine each day's prod schedule URL
*/
const PROD_CONSTANTS = [FIRST_PART_OF_SCHEDULE_URL_PROD, SECOND_PART_OF_SCHEDULE_URL_PROD, TSV_SHEET_IDS_PROD];
export default PROD_CONSTANTS;
