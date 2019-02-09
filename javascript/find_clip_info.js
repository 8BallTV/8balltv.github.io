import * as TIME_UTIL from './utils/time.js';

/*
* Finds a clip's filename and playback time for a specific time.
* The test parameter is true, if the function is being called from a
* test case.
*
* @param {Array<ClipDataObject>} formattedParseData
* @param {DateObject} date
* @param {Boolean} test
* @return {ClipDataObject} clipDataObject
*/
export default function findFilenameAndCalculatePlaybackTime(formattedParseData, date, test) {
  const currentClipDataObject = findClipDataObject(formattedParseData, date);
  const { fileName, partNumber } = currentClipDataObject;
  const playbackTime = calculatePlaybackTime(partNumber, date);

  return { fileName, playbackTime };
}

/* Finds a clipDataObject for a given time */
function findClipDataObject(formattedParseData, date) {
  const minutesPastMidnight = TIME_UTIL.calculateMinutesPastMidnight(date);
  const indexOfClipObject = Math.floor(minutesPastMidnight / 15);
  const clipDataObject = formattedParseData[indexOfClipObject];

  return clipDataObject;
}

/* Calculate at which time the clip file should start playback.

	The partNumber tells us if the clip is in a series- e.g. if
	partNumber === 3, then it's the third clip in a series.
*/
function calculatePlaybackTime(partNumber, date) {
  const [minutes, seconds] = [date.getMinutes(), date.getSeconds()];

  const playbackOffSetDueToClipPositionInSeries = (partNumber - 1) * 15;
  const playbackMinutesInto15MinuteInterval = minutes % 15;

  const playbackStartTimeMinutes =
    playbackOffSetDueToClipPositionInSeries +
    playbackMinutesInto15MinuteInterval;

  const playbackSeconds = playbackStartTimeMinutes * 60 + seconds;
  return playbackSeconds;
}
