import registerChatButtonListener from "./chat.js";
import registerFullScreenListeners from "./fullscreen.js";
import registerSoundListeners from "./sound.js";
import registerScheduleLinkListener from "./schedule.js";
import registerModalListeners from "./modal.js";
import registerCollectionLinklistener from "./collection.js";
/**
 * @author samdealy
 * @description Register all listeners for the video_page (index.html)
 * @param {null}
 * @return {null}
 */
export default function registerListeners() {
  registerChatButtonListener();
  registerFullScreenListeners();
  registerSoundListeners();
  registerScheduleLinkListener();
  registerModalListeners();
  registerCollectionLinklistener();
}
