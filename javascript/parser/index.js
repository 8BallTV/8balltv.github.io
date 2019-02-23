import determineCSV_URL from '../utils/csv_urls.js';
import formatParseData from './format_parse_data.js';

/*
* Loads the 8BallTV Schedule CSV file for the correct day. Calls the
* provided callback once CSV_Parse completes.
* 	Note: Callers can provide csv_urls. This is used in the tests.
*
* @param {Function} Callback
* @optional_param {String} csv_url
* @return {null}
*/
export default function parseCSV(callback, csv_url) {
	csv_url = csv_url || findScheduleForToday();
  Papa.parse(csv_url, {
		delimiter: '\t',
    download: true,
		fastMode: true,
    complete: csvParseResults =>  {
			const formattedParseData = formatParseData(csvParseResults);
			callback(formattedParseData);
		}
  });
};

/*
*	Finds the sheet's url for today's schedule
*
* @param{null}
* @return{String} csv_url
*/
function findScheduleForToday() {
	const date = new Date();
	const dayOfTheWeek = date.getDay();
	return determineCSV_URL(dayOfTheWeek);
}
