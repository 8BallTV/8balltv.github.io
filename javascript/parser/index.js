import determineTSV_URL from '../utils/tsv_urls.js';
import formatParseData from './format_parse_data.js';
import { findTodayDayString } from '../utils/shared_constants.js';

/**
* @author samdealy
* @description Callback that gets executed when PapaParse has completed parsing the schedule TSV.
* @callback parseCallback
* @param {Array<ClipDataObject>} formattedParseData
* @return {null}
*/

/**
* @author samdealy
* @description Loads the 8BallTV Schedule TSV file for the correct day. Calls the
* provided callback once TSV_Parse completes.
* NOTE: Callers can provide tsv_urls. This is used in the tests.
* @param {parseCallback} parseCallback - see above doc
* @param {String} [tsv_url] - optional
* @return {null}
*/
export default function parseTSV(parseCallback, /* optional */ tsv_url) {
	// The schedule page provides a tsv_url, while the video page
	// just wants to find the current schedule days.
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
			parseCallback(formattedParseData);
		}
  });
};

/**
* @author samdealy
* @description Finds the sheet's url for today's schedule
* @param {null}
* @return {String} tsv_url
*/
function findScheduleForToday() {
	const todayString = findTodayDayString();
	return determineTSV_URL(todayString);
}
