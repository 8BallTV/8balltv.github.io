import { convertClipDataObject } from "./find_clip_info.js";
import findCurrentClipDataInfo from "./find_clip_info.js";
import * as TIME_UTIL from "../utils/time.js";
import parseTSV from "../parser/index.js";
import { loadLivePlayer, removeLivePlayerIfExists } from "./live_player.js";
import { areYouInDevelopment } from "../utils/tsv_urls.js";

const mp4Source = document.getElementById("mp4_src");
const videoPlayer = document.getElementById("tv");
const videoTitleElement = document.getElementById("title");
const modalParagraphElement = document.getElementById("modal-text");
const modalTitleSpan = document.querySelector(".title_content");
const durationSpan = document.querySelector(".duration");

/** @type {Boolean} */
let isSoundOn = false;

const GO_DADDY_STORAGE_BASE_URL = "http://8balltv.club/content/";
const DIGITAL_OCEAN_STORAGE_BASE_URL_PROD =
  "https://8balltv.sfo2.digitaloceanspaces.com/transcodedVideos/";
const DIGITAL_OCEAN_STORAGE_BASE_URL_DEV =
  "https://8balltv-dev.sfo2.digitaloceanspaces.com/transcodedVideos/";

/**
 * @author samdealy, bhaviksingh
 *	@description Finds the current clip to play. If its a live player, sets up live player, else sets up the clip on the video player
 * @param {Array<ClipDataObject>} formattedParseData -- The data, a list of todays videos, to parse and find the right clip to play
 * @return {null}
 */
export default function findAndSetClipOnVideoPlayer(formattedParseData) {
  let currentClip = getCurrentClipDataInfo(formattedParseData);
  if (currentClip.isLive()) {
    setLivePlayer(currentClip);
  } else {
    setCurrentClipOnVideoPlayer(currentClip);
  }
}

/** @author bhaviksingh
 * @description Sets up the HTML5 video player by converting the currentClip into a playable video clip with playback time
 *  The playback time is calculated within convertClipDataObject
 * @param {ClipDataObject} currentClip -- the current clip to play
 */
function setCurrentClipOnVideoPlayer(currentClip) {
  let currentTime = new Date();
  let videoPlayerClip = convertClipDataObject(currentClip, currentTime);
  loadClipMetadata(videoPlayerClip);
  setSRC_URL(
    videoPlayerClip.fileName,
    videoPlayerClip.playbackTime,
    videoPlayerClip.storageLocation
  );
  showVideoPlayer();
  loadVideoPlayer();
}

/**
 * @author bhaviksingh
 * @description Sets up a live player, which is essentially an iFrame pointing to a URL. Hides the video player so the iFrame is visible
 * @param {ClipDataObject} liveClip  --- a clipDataObject of type LIVE with all the information to load the live player
 */
function setLivePlayer(liveClip) {
  loadClipMetadata(liveClip);
  hideVideoPlayer();
  loadLivePlayer(liveClip, videoPlayer.parentElement);
}

/**
 * @author bhaviksingh
 *	@description Set the html5 video player to play a specific clip from a collection
 * @param {Array<ClipDataObject>} formattedParseData -- parse the data, and get the right clip to play
 * @param {<ClipDataObject} selectedClip -- overrides parsing the data
 * @todo There should be a better way to write this function without this overriding
 * @return {null}
 */
export function setCollectionClipOnVideoPlayer(collectionClipData) {
  loadClipMetadata(collectionClipData);
  let videoPlayerClip = convertClipDataObject(collectionClipData, null);
  setSRC_URL(
    videoPlayerClip.fileName,
    videoPlayerClip.playbackTime,
    videoPlayerClip.storageLocation
  );
  showVideoPlayer();
  loadVideoPlayer();
}

/**
 * @author bhaviksingh
 * @description Helper function to load the title and modal text for a clip data/live data object
 * @param {ClipDataObject/LiveDataObject} clip to render metadata for
 */
function loadClipMetadata(clip) {
  setTitle(clip.title);
  setModalText(clip.modalText, clip.title, clip.duration);
}

/**
 * @author bhaviksingh
 * @description ensures that the video player is visible
 * @return {null}
 */
export function showVideoPlayer() {
  removeLivePlayerIfExists();
  videoPlayer.hidden = false;
}

/**
 * @author bhaviksingh
 * @description ensures that the video player is visible
 * @return {null}
 */
export function hideVideoPlayer() {
  videoPlayer.hidden = true;
}

/**
 * @author samdealy
 * @description Turns the sound on or off the HTML video player.
 * @param {Boolean} updatedIsSoundOn
 * @return {null}
 */
export function setSoundOnVideoPlayer(updatedIsSoundOn) {
  isSoundOn = updatedIsSoundOn;
  videoPlayer.muted = !isSoundOn;
}

/**
 * @author samdealy
 * @description Set the current clip's source url on the HTML src element.
 * @param {String} fileName
 * @param {Number} playbackTime
 * @param {String} storageLocation
 * @return {null}
 */
function setSRC_URL(fileName, playbackTime, storageLocation) {
  const srcURL = constructSrcURL(fileName, playbackTime, storageLocation);
  mp4Source.src = srcURL;
}

/**
 * @author samdealy
 * @description Set the current title on the title HTML element.
 * @param {String} title
 * @return {null}
 */
function setTitle(title) {
  videoTitleElement.innerHTML = title;
}

/**
 * @author samdealy
 * @description Set the modal text (which includes the file's duration) on modal.
 * @param {String} modalText
 * @param {String} title
 * @param {String} duration
 * @return {null}
 */
function setModalText(modalText, title, duration) {
  modalParagraphElement.innerText = modalText;
  // We have to use childNodes[0] because the outer-level span (with
  // class ".title-content" contains the title itself and a span
  // which contains the duration. Therefore we can't just assign
  // a value to the innerHTML or innerText to the outer level span, because
  // doing so would erase the duration span element.
  const titleText = modalTitleSpan.childNodes[0];
  titleText.nodeValue = title;
  // The "m" stands for minutes
  durationSpan.innerText = duration + "m";
}

/**
 * @author samdealy
 * @description Load the videoPlayer.
 * @param {String}
 * @return {null}
 */
function loadVideoPlayer() {
  videoPlayer.load();
}

/**
 * @author samdealy
 * @description Gets filename and playbacktime for the file
 *   that should be currently playing
 * @param {Array<ClipDataObject>} formattedParseData
 * @return {VideoPlayerClipInfo}
 */
function getCurrentClipDataInfo(formattedParseData) {
  const date = new Date();
  // If it's midnight, re-parse to load the next day's schedule.
  // Otherwise, at midnight you'd start playing the previous day's schedule
  if (TIME_UTIL.isItMidnight(date)) parseTSV(main);
  return findCurrentClipDataInfo(formattedParseData, date, false);
}

function constructSrcURL(filename, playbackTime, storageLocation) {
  const storageUrlBase = determineStorageBaseUrl(storageLocation);
  const srcURL = storageUrlBase + filename + "#t=" + playbackTime.toString();
  return srcURL;
}

function determineStorageBaseUrl(storageLocation) {
  switch (storageLocation) {
    case "GO_DADDY":
      return GO_DADDY_STORAGE_BASE_URL;
    case "DIGITAL_OCEAN":
      const isDev = areYouInDevelopment();
      return isDev === true
        ? DIGITAL_OCEAN_STORAGE_BASE_URL_DEV
        : DIGITAL_OCEAN_STORAGE_BASE_URL_PROD;
  }
}
