import * as TIME_UTIL from "../utils/time.js";
import { findClipDataObject } from "../parser/format_parse_data.js";

/**
 * @author samdealy
 * @description Finds a clip's filename and playback time for a specific time of day. Checks if there is anything live in New York, to override
 * @param {Array<ClipDataObject>} formattedParseData
 * @param {DateObject} date
 * @param {Boolean} test - true if function is called from a test
 * @return {ClipDataObject}
 */
export default function findCurrentClipDataInfo(
  formattedParseData,
  date,
  test
) {
  let currentClipInNewYork = getCurrentClipInNewYork(date, formattedParseData);
  if (currentClipInNewYork && currentClipInNewYork.isLive()) {
    return currentClipInNewYork;
  }

  const minutesPastMidnight = TIME_UTIL.calculateMinutesPastMidnight(date);
  const currentClipDataObject = findClipDataObject(
    formattedParseData,
    minutesPastMidnight
  );
  return currentClipDataObject;
}

/**
 * @author bhaviksingh
 * @description Given a clipDataObject, converts it to a videoPlayerClipInfo Object
 *  If a currentTime is specified, uses it to calculate where to start video. Otherwise just starts video at start.
 * @param {ClipDataObject} clipDataObject
 * @return {VideoPlayerClipInfo}
 */
export function convertClipDataObject(clipDataObject, currentTime) {
  const {
    fileName,
    partNumber,
    title,
    modalText,
    duration,
    storageLocation,
  } = clipDataObject;

  let playbackTime;
  if (!currentTime) playbackTime = 0;
  else playbackTime = calculatePlaybackTime(partNumber, currentTime);
  logConvertedClipInfo(title, playbackTime, fileName);

  return new VideoPlayerClipInfo(
    fileName,
    playbackTime,
    title,
    modalText,
    duration,
    storageLocation
  );
}

/**
 * @description Checks the schedule in New York time. If the schedule has a LIVE clip scheduled in NY time for current local time, returns true.
 *      Note an edge case that we return false if the day is not the same day as the local time, because in this case we'd have to download a new schedule
 * @param {Date} currentDate  current date for where the client is
 * @param {*} formattedParseData schedule for the current day
 * @return {currentClipInNewYork or null}  returns the currentClip in New York, or NULL in the edge case described above
 */
function getCurrentClipInNewYork(currentDate, formattedParseData) {
  let timeInNY = TIME_UTIL.getDateInNewYork(currentDate);
  if (timeInNY.getDay() != currentDate.getDay()) {
    return null;
  }
  let minutesPastMidnightInNewYork = TIME_UTIL.calculateMinutesPastMidnight(
    timeInNY
  );
  let currentClipInNewYork = findClipDataObject(
    formattedParseData,
    minutesPastMidnightInNewYork
  );
  return currentClipInNewYork;
}

/**
 * @author bhaviksingh
 * @description Helper function to log information in the console about the current clip playing
 * @param {String} title
 * @param {Number} playbackTime
 * @param {String} fileName
 */
function logConvertedClipInfo(title, playbackTime, fileName) {
  console.log(
    `Playing video ${title} at ${parseInt(playbackTime / 60)}:${
      playbackTime % 60
    }, with filename: ${fileName}`
  );
}

/**
 * @author samdealy
 * @description Calculate the time (seconds) at which the clip file
 *   should start playback.
 * @see {@link ./Readme.md|Readme} Readme for more details
 * @param {Number} partNumber - if partnumber is 2, then this clip should be playing in
 *   the second 15 minute portion of it's playback.
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

/**
 * @author samdealy
 * @description Contains the information necessary for the video_player.js to
 *   play the correct file at the correct playback time and dislay its title
 */
class VideoPlayerClipInfo {
  /**
   * @param {String} fileName - the name of the mp3 file
   * @param {Number} playbackTime - the time (ms) at which the file should start playback
   * @param {String} title - the title name ot be displayed while video plays
   * @param {String} modalText - text to be displayed in modal
   * @param {String} duration - duration of the entire file, not just the 15 minute clip. Will also be used in modal.
   * @param {String} storageLocation - where the video file is stored.
   */
  constructor(
    fileName,
    playbackTime,
    title,
    modalText,
    duration,
    storageLocation
  ) {
    this.fileName = fileName;
    this.playbackTime = playbackTime;
    this.title = title;
    this.modalText = modalText;
    this.duration = duration;
    this.storageLocation = storageLocation;
  }
}
