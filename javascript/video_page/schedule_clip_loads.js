import findAndSetClipOnVideoPlayer from "./video_player.js";
import * as TIME_UTIL from "../utils/time.js";
import scheduleSecondAndSubsequentActions from "../utils/scheduler.js";

/**
 * @author samdealy
 * @description A callback for parseTSV that initiates entire process of setting
 *   the currentClip on the video player and
 *   scheduling second and all subsequent clip loads.
 * @param {Array<Array<String>>} formattedParseData
 * @return {null}
 */
export default function scheduleClipLoads(formattedParseData) {
  findAndSetClipOnVideoPlayer(formattedParseData);
  scheduleSecondAndSubsequentActions(
    findAndSetClipOnVideoPlayer,
    formattedParseData
  );
}
