import determineTSV_URL from '../utils/tsv_urls.js';
import formatParseData from './format_parse_data.js';
import { findTodayDayString } from '../utils/shared_constants.js';

/***
* Loads the 8BallTV Schedule TSV file for the correct day. Calls the
* provided callback once TSV_Parse completes.
* 	Note: Callers can provide tsv_urls. This is used in the tests.
*
* @param {Function} Callback
* @param {String} tsv_url
* @return {null}
*/
export default function parseTSV(callback, tsv_url) {
	tsv_url = tsv_url || findScheduleForToday();
	Papa.parse(tsv_url, {
		/*
		* We split on Tabs to protect titles with commas. As such
		* the Google Sheet schedule is exported as a TSV file.
		*/
		delimiter: '\t',
		download: true,
		fastMode: true,
		complete: tsvParseResults =>  {
			const formattedParseData = formatParseData(tsvParseResults);
			callback(formattedParseData);
		}
  });
};

/**
* Finds the sheet's url for today's schedule
*
* @param{null}
* @return{String} tsv_url
*/
function findScheduleForToday() {
	const todayString = findTodayDayString();
	return determineTSV_URL(todayString);
}
