import registerFullScreenListeners from './fullscreen.js';
import registerSoundListeners from './sound.js';
import registerScheduleLinkListener from './schedule.js';
/**
* Register all listeners for the video_page (index.html)
* @param{null}, @return{null}
*/
export default function registerListeners() {
  registerFullScreenListeners();
  registerSoundListeners();
  registerScheduleLinkListener();
}
