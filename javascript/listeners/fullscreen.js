/*
* Register both the enter and exit fullscreen listeners
* @param{null}, @return{null}
*/
export default function registerFullScreenListeners() {
  registerEnterFullScreenListener();
  registerExitFullScreenListener();
}

const enterFullScreen = document.getElementById('go-fs');
const exitFullScreen = document.getElementById('exit-fs');
/*
* Register the enter fullscreen listener
* @param{null}, @return{null}
*/
function registerEnterFullScreenListener() {
  enterFullScreen.addEventListener('click', e => {
    e.preventDefault();
    requestFullscreen(document.documentElement);
    exitFullScreen.style.display = 'inline';
    enterFullScreen.style.display = 'none';
  });
}

/*
* Register the exit fullscreen listener
* @param{null}, @return{null}
*/
function registerExitFullScreenListener() {
  exitFullScreen.addEventListener('click', e => {
      e.preventDefault();
      exitFullscreen();
      exitFullScreen.style.display = 'none';
      enterFullScreen.style.display = 'inline';
  });
}

/*
* Handle DOM enter fullscreen requests for each browswer
* @param{null}, @return{null}
*/
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        console.log('Fullscreen API is not supported.');
    }
};

/*
* Handle DOM exit fullscreen requests for each browswer
* @param{null}, @return{null}
*/
function exitFullscreen() {
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
