import determineCSV_URL from './utils/csv_urls.js';
import { formatParseData } from './format_parse_data.js';
import findFileNameAndCalculatePlaybackStartTime from './find_clip_info.js';
import * as TIME_UTIL from './utils/time.js';
import setClipOnVideoPlayer from './video_player.js';

/*
* Loads the 8BallTV Schedule CSV file for the correct day. Calls the
* provided callback once CSV_Parse completes.
* 	Note: Callers, like tests, can provide csv_urls
*
* @param {Function} Callback
* @optional_param {String} csv_url
* @return {null}
*/
export const parseCSV = (callback, csv_url) => {
	csv_url = csv_url || determineCSV_URL();
  Papa.parse(csv_url, {
    download: true,
		fastMode: true,
    complete: csvParseResults =>  {
			const formattedParseData = formatParseData(csvParseResults);
			callback(formattedParseData);
		}
  });
};

/*
* A callback for parseCSV that initiates entire process of setting
* the currentClip on the video player and
* scheduling subsequent clip loads.
*
* @param {Array<Array<String>>} csvParseResults
* @return {null}
*/
export function main(formattedParseData) {
  setClipOnVideoPlayer(formattedParseData);
  scheduleSubsequentClipLoads(formattedParseData);
};

/*
* Schedules the first clipload and all subsequent clip loads.
*
* @param {null}, @return {null}
*/
async function scheduleSubsequentClipLoads(formattedParseData) {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsUntilNext15MinuteInterval();
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Setting first new video, the time is: ${JSON.stringify(new Date())}`);
      setClipOnVideoPlayer(formattedParseData);
      resolve();
    }, millisecondsUntilFirstNewQuery);
  });

  await promise;

  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  setInterval(() => setClipOnVideoPlayer(formattedParseData), fifteenMinutesInMilliseconds);
}
