import { setSoundOnVideoPlayer } from '../video_player.js';

const turnSoundOnDivElement = document.getElementById("turn-sound-on");
const turnSoundOffDivElement = document.getElementById("turn-sound-off");

/*
* Register both the turn sound on and turn sound off listeners
* for the associated div elements.
*
* @param{null}, @return{null}
*/
export default function registerSoundListeners() {
  registerTurnSoundOnListener();
  registerTurnSoundOffListener()
}

/*
* Register turn sound on div element listener.
*
* @param{null}, @return{null}
*/
function registerTurnSoundOnListener() {
  turnSoundOnDivElement.addEventListener('click', e => {
    toggleSound(true, turnSoundOnDivElement, turnSoundOffDivElement, e);
  });
}

/*
* Register turn sound off div element listener
* @param{null}, @return{null}
*/
function registerTurnSoundOffListener() {
  turnSoundOffDivElement.addEventListener('click', e => {
    toggleSound(false, turnSoundOffDivElement, turnSoundOnDivElement, e);
  });
}

/*
* Prevent the default action on the event object.
* For the div element that was clicked, change its display to none
* Make visible the other div element (that wasn't clicked).
* Then set the sound accordingly on the videoPlayer.
*
* @param{Boolean} areYouTurningSoundOn
* @param{DOMObject} clickedDivElement
* @param{DOMObject} divElementToDisplay
* @param{Event} eventObject
* @return{null}
*/
function toggleSound(areYouTurningSoundOn, clickedDivElement, DivElementToDisplay, eventObject) {
  eventObject.preventDefault();
  clickedDivElement.style.display = "none";
  DivElementToDisplay.style.display = "inline";
  setSoundOnVideoPlayer(areYouTurningSoundOn);
}
