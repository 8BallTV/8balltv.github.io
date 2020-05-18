/** To generate these URLs, ensure that your Google Sheet is published to the web. */
/** @const @type {String} */
const FIRST_PART_OF_SCHEDULE_URL_DEV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTjf-IMA5TF2OALd3W_DTM1BcnSbX4ToBPOwuExBiLXGpJNMmE-FHt572QmtMv9u2W2XRkTHn9Nnh-k/pub?gid=';
/** @const @type {String} */
const SECOND_PART_OF_SCHEDULE_URL_DEV = '&single=true&output=tsv';

/**
 * @const
 * @type {Object<String, String>}
 * @description ID numbers for the specific sheets on the dev schedule
 */
const TSV_SHEET_IDS_DEV = {
    monday: '192360482',
    tuesday: '1036455868',
    wednesday: '949173297',
    thursday: '483801566',
    friday: '228299691',
    saturday: '1694530893',
    sunday: '835076295',
    collectionVideos: '1208670085',
    collectionInfo: '1392248605'
}

/**
 * @const
 * @type {String}
 * @description Used in the {@link ../video_page/tests/filename_playback_test.js|File name playback tests}
 */
export const testURL = FIRST_PART_OF_SCHEDULE_URL_DEV + "438846256" + SECOND_PART_OF_SCHEDULE_URL_DEV;

/**
 * @const
 * @type {Array<string, string, Object<string, string>}
 * @description Used to determine each day's dev schedule URL
 */
const DEV_CONSTANTS = [FIRST_PART_OF_SCHEDULE_URL_DEV, SECOND_PART_OF_SCHEDULE_URL_DEV, TSV_SHEET_IDS_DEV];
export default DEV_CONSTANTS;