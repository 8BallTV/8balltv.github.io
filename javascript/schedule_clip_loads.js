import setClipOnVideoPlayer from './video_player.js';
import * as TIME_UTIL from './utils/time.js';

/*
* A callback for parseCSV that initiates entire process of setting
* the currentClip on the video player and
* scheduling second and all subsequent clip loads.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
export default function scheduleClipLoads(formattedParseData) {
  // Set the current clip on the video player
  setClipOnVideoPlayer(formattedParseData);
  scheduleSecondAndSubsequentClipLoads(formattedParseData);
};

/*
* Schedules the first clipload and all subsequent clip loads.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
async function scheduleSecondAndSubsequentClipLoads(formattedParseData) {
  let secondClipLoadPromise = scheduleSecondClipLoad(formattedParseData);
  await secondClipLoadPromise;
  scheduleSubsequentClipLoads();
}

/*
* Schedule the second clip load. Since the time between the first clip
* load and second clip load is variable, we have to find the millisecondsUntilFirstNewQuery
* for each clip load.
*
* @param {Array<Array<String>>} formattedParseData
* @return {Promise} secondClipLoadPromise
*/
function scheduleSecondClipLoad(formattedParseData) {
  const millisecondsUntilFirstNewQuery = TIME_UTIL.findMillisecondsUntilNext15MinuteInterval();
  let secondClipLoadPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      setClipOnVideoPlayer(formattedParseData);
      resolve();
    }, millisecondsUntilFirstNewQuery);
  });

  return secondClipLoadPromise;
}

/*
* Schedule all clip loads after the second clip load. The time between thes
* second clip load and subsequent clip loads is always 15 minutes.
*
* @param {Array<Array<String>>} formattedParseData
* @return {null}
*/
function scheduleSubsequentClipLoads(formattedParseData) {
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  setInterval(() => setClipOnVideoPlayer(formattedParseData), fifteenMinutesInMilliseconds);
}
