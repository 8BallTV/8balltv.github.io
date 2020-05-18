import registerChatButtonListener from '../../video_page/listeners/chat.js'
import registerFullScreenListeners from '../../video_page/listeners/fullscreen.js';
import registerSoundListeners from '../../video_page/listeners/sound.js';
import registerScheduleLinkListener from '../../video_page/listeners/schedule.js';
import registerModalListeners from '../../video_page/listeners/modal.js';

/**
 * @author bhaviksingh
 * @description Register all listeners for the collections page (collections.html)
 * @param {null}
 * @return {null}
 */

export default function registerListeners() {
    registerChatButtonListener();
    registerFullScreenListeners();
    registerSoundListeners();
    registerModalListeners();
}