import { determineCSV_URL } from './csv_urls.js';
import { formatParseData } from './format_parse_data.js';
import findFileNameAndCalculatePlaybackStartTime from './find_clip_info.js';
import * as TIME_UTIL from './utils/time.js';
import setClipOnVideoPlayer from './video_player.js';

let formattedParseData;

/*
* Loads the 8BallTV Schedule CSV file for the correct day
*
* @param {null}, @return {null}
*/
export const parseCSV = () => {
	const CSV_URL = determineCSV_URL();
  Papa.parse(CSV_URL, {
    download: true,
    complete: csvParseResults =>  main(csvParseResults)
  });
}

/*
* A callback for parseCSV that initiates entire process of setting
* the currentClip on the video player and
* scheduling subsequent clip loads.
*
* @param {Array<Array<String>>} csvParseResults
* @return {null}
*/
function main(csvParseResults) {
	formattedParseData =  formatParseData(csvParseResults);
  console.log(formattedParseData);
  setClipOnVideoPlayer(formattedParseData);
  scheduleSubsequentClipLoads();
}

/*
* Schedules the first clipload and all subsequent clip loads.
* @param {null}, @return {null}
*/
async function scheduleSubsequentClipLoads() {
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
