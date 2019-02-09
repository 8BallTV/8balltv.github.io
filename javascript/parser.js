import { determineCSV_URL } from './csv_urls.js';
import { formatParseData } from './format_parse_data.js';
import findFileNameAndCalculatePlaybackStartTime from './current_clip.js';
import * as TIME_UTIL from './utils/time.js';


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
  setClipOnVideoPlayer();
  scheduleSubsequentClipLoads();
}

/* Schedules subsequent clip loads by  */
async function scheduleSubsequentClipLoads() {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsToQueryForNewClip();
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Setting first new video, the time is: ${JSON.stringify(new Date())}`);
      setClipOnVideoPlayer();
      resolve();
    }, millisecondsUntilFirstNewQuery);
  });

  await promise;

  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  setInterval(() => setClipOnVideoPlayer(), fifteenMinutesInMilliseconds);
}

/*
	Given the current time, set the html5 video player to play the clip
	file at the correct time.
 */
export function setClipOnVideoPlayer() {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if(TIME_UTIL.isItMidnight(date)) parseCSV();
  const currentFileNameAndPlaybackStartTime = findFileNameAndCalculatePlaybackStartTime(formattedParseData, date, false);
	console.log(JSON.stringify(currentFileNameAndPlaybackStartTime));
  //TODO Logic to update the videoplayer
}

// export function findFileNameAndCalculatePlaybackStartTime(formattedParseData, date, test) {
//   const currentClipDataObject = findCurrentClipDataObject(date);
//   const { fileName, partNumber } = currentClipDataObject;
//   const timeToStartPlayingVideo = calculatePlaybackStartTime(partNumber, date);
//
//   return {
//     fileName,
//     timeToStartPlayingVideo
//   };
// }
//
// /* Finds the ClipDataObject for the currently scheduled file */
// function findCurrentClipDataObject(date) {
//   const minutesPastMidnight = TIME_UTIL.calculateMinutesPastMidnight(date);
//   const indexOfCurrentClipObject = Math.floor(minutesPastMidnight / 15);
//   const currentClipDataObject = formattedParseData[indexOfCurrentClipObject];
//
//   return currentClipDataObject;
// }
//
// /* Calculate at which time the clip file should start playback.
//
// 	The partNumber tells us if the clip is in a series- e.g. if
// 	partNumber === 3, then it's the third clip in a series.
// */
// function calculatePlaybackStartTime(partNumber, date) {
//   const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
//
//   const playbackOffSetDueToClipPositionInSeries = (partNumber - 1) * 15;
//   const playbackMinutesInto15MinuteInterval = minutes % 15;
//
//   const playbackStartTimeMinutes =
//     playbackOffSetDueToClipPositionInSeries +
//     playbackMinutesInto15MinuteInterval;
//
//   const playbackSeconds = playbackStartTimeMinutes * 60 + seconds;
//   return playbackSeconds;
// }
