import * as TIME_UTIL from './utils/time.js';

export default function findFileNameAndCalculatePlaybackStartTime(formattedParseData, date, test) {
  const currentClipDataObject = findCurrentClipDataObject(formattedParseData, date);
  const { fileName, partNumber } = currentClipDataObject;
  const timeToStartPlayingVideo = calculatePlaybackStartTime(partNumber, date);

  return { fileName, timeToStartPlayingVideo };
}

/* Finds the ClipDataObject for the currently scheduled file */
function findCurrentClipDataObject(formattedParseData, date) {
  const minutesPastMidnight = TIME_UTIL.calculateMinutesPastMidnight(date);
  const indexOfCurrentClipObject = Math.floor(minutesPastMidnight / 15);
  const currentClipDataObject = formattedParseData[indexOfCurrentClipObject];

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
