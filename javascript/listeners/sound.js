import { setSoundOnVideoPlayer } from '../video_player.js';

/*
* Register both the turn sound on and turn sound off button listeners
* @param{null}, @return{null}
*/
export default function registerSoundButtonListeners() {
  registerTurnSoundOnButtonListener();
  registerTurnSoundOffButtonListener()
}


const turnSoundOnButton = document.getElementById("soundon");
const turnSoundOffButton = document.getElementById("soundoff");

/*
* Register turn sound on button listener
* @param{null}, @return{null}
*/
function registerTurnSoundOnButtonListener() {
  turnSoundOnButton.addEventListener('click', e => {
    toggleSound(true, turnSoundOnButton, turnSoundOffButton, e);
  });
}


/*
* Register turn sound off button listener
* @param{null}, @return{null}
*/
function registerTurnSoundOffButtonListener() {
  turnSoundOffButton.addEventListener('click', e => {
    toggleSound(false, turnSoundOffButton, turnSoundOnButton, e);
  });
}

/*
* Prevent the default action on the event obejct.
* For the button that was clicked, change its display to none
* and inline. Then set the sound accordingly on the videoPlayer.
*
* @param{Boolean} areYouTurningSoundOn
* @param{DOMObject} button
* @param{Event} eventObject
* @return{null}
*/
function toggleSound(areYouTurningSoundOn, clickedButton, buttonToDisplay, eventObject) {
  eventObject.preventDefault();
  clickedButton.style.display = "none";
  buttonToDisplay.style.display = "inline";
  setSoundOnVideoPlayer(areYouTurningSoundOn);
}
