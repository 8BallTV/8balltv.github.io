import findFileNameAndCalculatePlaybackStartTime from './current_clip.js';
import * as TIME_UTIL from './utils/time.js';
import { parseCSV } from './parser.js';

/*
	Given the current time, set the html5 video player to play the clip
	file at the correct time.
 */
export default function setClipOnVideoPlayer(formattedParseData) {
  const { fileName, timeToStartPlayingVideo } = getClipAndPlayback(formattedParseData);
  console.log(`file name is: ${fileName}`);
  console.log(`playbackTime is: ${timeToStartPlayingVideo}`);
  //TODO Logic to update the videoplayer
}

function getClipAndPlayback(formattedParseData) {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if(TIME_UTIL.isItMidnight(date)) parseCSV();
  return findFileNameAndCalculatePlaybackStartTime(formattedParseData, date, false);
}