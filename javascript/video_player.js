import findFilenameAndCalculatePlaybackTime from './find_clip_info.js';
import * as TIME_UTIL from './utils/time.js';
import constructSrcURL from './utils/video_player.js';
import parseCSV from './parser.js';
import scheduleClipLoads from './schedule_clip_loads.js';

/*
*	Set the html5 video player to play the current
* time's clip at the playback time.
*
* @param {Array<ClipDataObject>} formattedParseData
* @return {null}
*/

const mp4Source =  document.getElementById("mp4_src");
const videoPlayer = document.getElementById("tv");
let isSoundOn = false;

export default function setClipOnVideoPlayer(formattedParseData) {
  const videoPlayerClipInfo = getCurrentFilenameAndPlaybackTime(formattedParseData);
  const [fileName, playbackTime] = [videoPlayerClipInfo.fileName, videoPlayerClipInfo.playbackTime];
  const srcURL = constructSrcURL(fileName, playbackTime);
  mp4Source.src = srcURL;
  setSoundOnVideoPlayer();
  const logString = isSoundOn ? "on" : "off";
  console.log(`[setClipOnVideoPlayer] The sound is: ${logString}`);
  videoPlayer.load();
}

export function setSoundOnVideoPlayer(updatedIsSoundOn) {
  console.log('[setSoundOnVideoPlayer] HI from set setSoundOnVideoPlayer');
  console.log(`[setSoundOnVideoPlayer] The new updated sound is: ${updatedIsSoundOn}`);
  isSoundOn = updatedIsSoundOn;
  videoPlayer.muted = !isSoundOn;
}


/*
* Gets filename and playbacktime for the file
* that should be currently playing
*
* @param {Array<ClipDataObject>} formattedParseData
* @return {VideoPlayerClipInfo} (un-named)
*/
function getCurrentFilenameAndPlaybackTime(formattedParseData) {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if(TIME_UTIL.isItMidnight(date)) parseCSV(main);
  return findFilenameAndCalculatePlaybackTime(formattedParseData, date, false);
}
