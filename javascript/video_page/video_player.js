import { convertClipDataObject } from "./find_clip_info.js";
import findCurrentClipDataInfo from "./find_clip_info.js";
import * as TIME_UTIL from "../utils/time.js";
import parseTSV from "../parser/index.js";
import { loadLivePlayer, removeLivePlayerIfExists } from "./live_player.js";

const mp4Source = document.getElementById("mp4_src");
const videoPlayer = document.getElementById("tv");
const videoTitleElement = document.getElementById("title");
const modalParagraphElement = document.getElementById("modal-text");
const modalTitleSpan = document.querySelector(".title_content");
const durationSpan = document.querySelector(".duration");

/** @type {Boolean} */
let isSoundOn = false;

/**
 * @const @type {String}
 * @description base url for videos
 */
const LINKER = "http://8balltv.club/content/";
/**
 * @author samdealy, bhaviksingh
 *	@description Set the html5 video player to play the current
 *   time's clip at the playback time.
 * @param {Array<ClipDataObject>} formattedParseData -- parse the data, and get the right clip to play
 * @param {<ClipDataObject} selectedClip -- overrides parsing the data
 * @todo There should be a better way to write this function without this overriding
 * @return {null}
 */
export default function setClipOnVideoPlayer(
    formattedParseData,
    selectedClipData
) {
    let currentClip, date;
    if (selectedClipData) {
        currentClip = selectedClipData;
        date = undefined;
    } else {
        currentClip = getCurrentClipDataInfo(formattedParseData);
        date = new Date();
    }
    loadClipMetadata(currentClip);
    if (currentClip.isLive()) {
        hideVideoPlayer();
        loadLivePlayer(currentClip, videoPlayer.parentElement);
    } else {
        let videoPlayerClip = convertClipDataObject(currentClip, date);
        setSRC_URL(videoPlayerClip.fileName, videoPlayerClip.playbackTime);
        showVideoPlayer();
        loadVideoPlayer();
    }
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
 * @return {null}
 */
function setSRC_URL(fileName, playbackTime) {
    const srcURL = constructSrcURL(fileName, playbackTime);
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

function constructSrcURL(filename, playbackTime) {
    const srcURL = LINKER + filename + "#t=" + playbackTime.toString();
    return srcURL;
}