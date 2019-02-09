/*
	This script loads the 8BallTV Schedule CSV file and determines
	which clip file to play and the time at which to start playback.
*/
export const CSV_FILE_URL = "https://docs.google.com/spreadsheets/d/e" +
  "/2PACX-1vRCmu8vTzD_R7L2iqEE0gdD43zbEnTUv5-" +
  "_f6cHz1zX16JN6c2sdWKagLuOWPO8HBnbghfmInxWN" +
  "wSz/pub?output=csv";

export function parseCSV() {
  Papa.parse(CSV_FILE_URL, {
    download: true,
    complete: csvParseResults => main(csvParseResults)
  });
}

/*
	A callback that gets executed when the 8BallTV scheduling CSV
	file has been parsed.

	It first finds the file name for the current clip, which will be used
	to provide the video player with the correct source URL for the clip.
	The function then finds at which time to play the clip.
*/
function main(csvParseResults) {
  setClipOnVideoPlayer(csvParseResults);
  scheduleSubsequentClipLoads(csvParseResults);
}

/*

*/
async function scheduleSubsequentClipLoads(csvParseResults) {
  const millisecondsUntilFirstNewQuery = findMillisecondsToQueryForNewClip();
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Setting first new video, the time is: ${JSON.stringify(new Date())}`);
      setClipOnVideoPlayer(csvParseResults);
      resolve();
    }, millisecondsUntilFirstNewQuery);
  });

  await promise;

  const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
  setInterval(() => setClipOnVideoPlayer(csvParseResults), fifteenMinutesInMilliseconds);
}

/*
	Given the current time, set the html5 video player to play the clip
	file at the correct time.
 */
export function setClipOnVideoPlayer(csvParseResults) {
  const date = new Date();
  const currentClipAndPlaybackStartTime = findFileNameAndCalculatePlaybackStartTime(csvParseResults, date, false);
  //Logic to update the videoplayer
}

export function findFileNameAndCalculatePlaybackStartTime(csvParseResults, date, test) {
  const clipDataObjectsArray = createClipDataObjectsArray(csvParseResults);

  const currentClipDataObject = findCurrentClipDataObject(clipDataObjectsArray, date);
  const {
    fileName,
    partNumber
  } = currentClipDataObject;
  const timeToStartPlayingVideo = calculatePlaybackStartTime(partNumber, date);

  return {
    fileName,
    timeToStartPlayingVideo
  };
}

/* Returns number of milliseconds to wait until querying for new clip
 *		pararms:
 *     Date: javascript Date Object
 *			Boolean test: true if in testing mode, false if in production
 */
export function findMillisecondsToQueryForNewClip(date, test) {
  if (!test) {
    date = new Date();
  }
  const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
  const secondsUntilNextQuery = (15 - (minutes % 15)) * 60 - seconds;
  return secondsUntilNextQuery * 1000;
}

/* Finds the ClipDataObject for the currently scheduled file */
function findCurrentClipDataObject(clipDataObjectsArray, date) {
  const minutesPastMidnight = calculateMinutesPastMidnight(date);

  const indexOfCurrentClipObject = Math.floor(minutesPastMidnight / 15);
  const currentClipDataObject = clipDataObjectsArray[indexOfCurrentClipObject];

  return currentClipDataObject;
}

/* Calculate at which time the clip file should start playback.

	The partNumber tells us if the clip is in a series- e.g. if
	partNumber === 3, then it's the third clip in a series.
*/
function calculatePlaybackStartTime(partNumber, date) {
  const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];

  const playbackOffSetDueToClipPositionInSeries = (partNumber - 1) * 15;
  const playbackMinutesInto15MinuteInterval = minutes % 15;

  const playbackStartTimeMinutes =
    playbackOffSetDueToClipPositionInSeries +
    playbackMinutesInto15MinuteInterval;

  const playbackSeconds = playbackStartTimeMinutes * 60 + seconds;
  return playbackSeconds;
}

function calculateMinutesPastMidnight(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function createClipDataObjectsArray(csvParseResults) {
  const clipDataObjectsArrayWithHeader = csvParseResults.data.map((data, i) => {
    return {
      fileName: data[1],
      partNumber: data[2],
      title: data[3],
      director: data[4]
    };
  });

  // Slice to get rid of the first entry, which is the CSV's column
  // headers
  const clipDataObjectsArray = clipDataObjectsArrayWithHeader.slice(1);

  return clipDataObjectsArray;
}
