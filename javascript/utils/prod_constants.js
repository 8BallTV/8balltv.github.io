/** To generate these URLs, ensure that your Google Sheet is published to the web. */
/** @const @type {String} */
//TODO(samdealy): Keep an eye on the rate limit for cors-anywhere. Potentially
// deploy our own heroku app that does this.
const FIRST_PART_OF_SCHEDULE_URL_PROD =
  "https://radiant-citadel-82769.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7EnR4fHqDgT3ZqXWXpl4xb7C4tv1PkEMHfxN5sGHponRwH36OALT_MrY3JLn3zPyrqr0oERerBob6/pub?gid=";
/** @const @type {String} */
const SECOND_PART_OF_SCHEDULE_URL_PROD = "&single=true&output=tsv";


/**
 * @const
 * @type {Object<String, String>}
 * @description ID numbers for the specific sheets on the prod schedule
 */

const TSV_SHEET_IDS_PROD = {
  monday: "192360482",
  tuesday: "1036455868",
  wednesday: "949173297",
  thursday: "483801566",
  friday: "228299691",
  saturday: "1694530893",
  sunday: "835076295",
  collectionVideos: "681715567",
  collectionInfo: "881663141",
};

/**
 * @const
 * @type {Array<string, string, Object<string, string>}
 * @description Used to determine each day's prod schedule URL
 */
const PROD_CONSTANTS = [
  FIRST_PART_OF_SCHEDULE_URL_PROD,
  SECOND_PART_OF_SCHEDULE_URL_PROD,
  TSV_SHEET_IDS_PROD,
];
console.log(PROD_CONSTANTS);
export default PROD_CONSTANTS;
