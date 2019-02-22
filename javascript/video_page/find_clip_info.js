import * as TIME_UTIL from '../utils/time.js';
import { findClipDataObject } from '../parser/format_parse_data.js';
import formatAndPrintToConsole from '../utils/console_set_up_test.js';

/*
* Finds a clip's filename and playback time for a specific time of day.
* The test parameter is true, if the function is being called from a
* test case.
*
* @param {Array<ClipDataObject>} formattedParseData
* @param {DateObject} date
* @param {Boolean} test
* @return {VideoPlayerClipInfo} ()
*/
export default function findVideoPlayerClipInfo(formattedParseData, date, test) {
  const minutesPastMidnight = TIME_UTIL.calculateMinutesPastMidnight(date);
  const currentClipDataObject = findClipDataObject(formattedParseData, minutesPastMidnight);
  const { fileName, partNumber, title } = currentClipDataObject;

  const playbackTime = calculatePlaybackTime(partNumber, date);
  // TODO: Delete in production
  formatAndPrintToConsole(date, fileName, title, partNumber, playbackTime);
  return new VideoPlayerClipInfo(fileName, playbackTime, title);
}

/*
* Calculate the time (seconds) at which the clip file
* should start playback.
*
* @param {Number} partNumber
*     e.g. if partnumber is 2, then this clip should be playing in
*          the second 15 minute portion of it's playback.
* @param {DateObject} date
* @return {Number} playbackSeconds
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

class VideoPlayerClipInfo {
  constructor(fileName, playbackTime, title) {
    this.fileName = fileName;
    this.playbackTime = playbackTime;
    this.title = title;
  }
}
