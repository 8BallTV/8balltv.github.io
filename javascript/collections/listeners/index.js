import registerChatButtonListener from '../../video_page/listeners/chat.js'
import registerFullScreenListeners from '../../video_page/listeners/fullscreen.js';
import registerSoundListeners from '../../video_page/listeners/sound.js';
import registerModalListeners from '../../video_page/listeners/modal.js';
import { setupRepositionListener } from "../../utils/repositioning.js";


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
    registerCollectionButtonListener();
    registerHomeLinkListener();
}

/**
 * @author bhaviksingh
 * @description Register an on-click listener for the collection buttons and sets up its repositioning
 * @listens onClick
 * @param {null}
 * @return {null}
 */
function registerCollectionButtonListener() {
    const collectionButton = document.querySelector(".collection-button");
    const collectionBox = document.getElementById("collectionbox-container");
    collectionButton.addEventListener("click", (e) => {
        if (window.getComputedStyle(collectionBox).visibility === "hidden") {
            collectionBox.style.visibility = "visible";
        } else {
            collectionBox.style.visibility = "hidden";
        }
    });
    const collectionRepositionWidget = document.querySelector("#collection-positioning");
    setupRepositionListener(collectionRepositionWidget);
}

/**
 * @author bhaviksingh
 * @description Register an on-click listener for the home page
 * @listens onClick
 * @param {null}
 * @return {null}
 */
function registerHomeLinkListener() {
    const homeButton = document.querySelector(".home-button");
    homeButton.addEventListener('click', e => {
        window.location.pathname = "/index.html";
    });
}