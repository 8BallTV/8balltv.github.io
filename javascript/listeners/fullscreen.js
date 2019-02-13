const enterFullScreenButton = document.getElementById('go-fs');
const exitFullScreenButton = document.getElementById('exit-fs');

/*
* Register both the enter and exit fullscreen listeners
* @param{null}, @return{null}
*/
export default function registerFullScreenListeners() {
  registerEnterFullScreenListener();
  registerExitFullScreenListener();
}

/*
* Register the enter fullscreen listener
* @param{null}, @return{null}
*/
function registerEnterFullScreenListener() {
  enterFullScreenButton.addEventListener('click', e => {
    toggleFullScreen(requestFullscreenCallback, enterFullScreenButton, exitFullScreenButton, e);
  });
}

/*
* Register the exit fullscreen listener
* @param{null}, @return{null}
*/
function registerExitFullScreenListener() {
  exitFullScreenButton.addEventListener('click', e => {
    toggleFullScreen(exitFullscreenCallback, exitFullScreenButton, enterFullScreenButton, e);
  });
}

/*
* Prevent the default action on the event obejct.
* Call the provided browser callback. For the button that was clicked,
* change its display to none. Make visible the other
* button (that wasn't clicked).
*
* @param{Function} browserCallback
* @param{Element} clickedButton
* @param{Element} buttonToDisplay
* @param{Event} eventObject
*/
function toggleFullScreen(browserCallback, clickedButton, buttonToDisplay, eventObject) {
  eventObject.preventDefault();
  browserCallback();
  clickedButton.style.display = 'none';
  buttonToDisplay.style.display = 'inline';
}

/*
* Handle DOM enter fullscreen requests for each browswer.
* @param{null}, @return{null}
*/
let requestFullscreenCallback = () => {
    const documentElement = document.documentElement;
    if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
    } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen();
    } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
    } else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

/*
* Handle DOM exit fullscreen requests for each browswer
* @param{null}, @return{null}
*/
let exitFullscreenCallback = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};
