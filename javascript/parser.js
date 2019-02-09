import { determineCSV_URL } from './csv_urls.js';
import { formatParseData } from './format_parse_data.js';
import findFileNameAndCalculatePlaybackStartTime from './current_clip.js';
import * as TIME_UTIL from './utils/time.js';
import setClipOnVideoPlayer from './video_player.js';

let formattedParseData;
/*
	This script loads the 8BallTV Schedule CSV file for the correct day,
  and determines which clip file to play and the time at which to
  start playback.
*/
export const parseCSV = () => {
	const CSV_URL = determineCSV_URL();
  Papa.parse(CSV_URL, {
    download: true,
    complete: results =>  main(results)
  });
}

/*
	A callback that gets executed when the 8BallTV scheduling CSV
	file has been parsed.
*/
function main(results) {
	formattedParseData =  formatParseData(results);
  console.log(formattedParseData);
  setClipOnVideoPlayer(formattedParseData);
  scheduleSubsequentClipLoads();
}

/* Schedules subsequent clip loads by  */
async function scheduleSubsequentClipLoads() {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsToQueryForNewClip();
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
