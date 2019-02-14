import findVideoPlayerClipInfo from './find_clip_info.js';
import * as TIME_UTIL from './utils/time.js';
import constructSrcURL from './utils/video_player.js';
import parseCSV from './parser.js';
import scheduleClipLoads from './schedule_clip_loads.js';

const mp4Source =  document.getElementById("mp4_src");
const videoPlayer = document.getElementById("tv");
const videoTitleElement = document.getElementById("title");
let isSoundOn = false;

/*
*	Set the html5 video player to play the current
* time's clip at the playback time.
*
* @param {Array<ClipDataObject>} formattedParseData
* @return {null}
*/
export default function setClipOnVideoPlayer(formattedParseData) {
  const currentClip = getCurrentFilenameAndPlaybackTime(formattedParseData);
  const srcURL = constructSrcURL(currentClip.fileName, currentClip.playbackTime);

  mp4Source.src = srcURL;
  videoTitleElement.innerHTML = currentClip.title;
  setSoundOnVideoPlayer();
  videoPlayer.load();
}

/*
* Turns the sound on or off the HTML video player.
*
* @param{Boolean} updatedIsSoundOn
* @return{null}
*/
export function setSoundOnVideoPlayer(updatedIsSoundOn) {
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
  return findVideoPlayerClipInfo(formattedParseData, date, false);
}
