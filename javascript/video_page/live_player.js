/**
 * @author bhaviksingh
 * @description Loads a given live clip into the page, via an iFrame page
 */
export function loadLivePlayer(liveClip, parentDOM) {
  removeLivePlayerIfExists();
  let liveClipDom = getLiveDOM(liveClip);
  parentDOM.prepend(liveClipDom);
}

/** @author bhaviksingh
 *  @description Removes the live player from the page, by removing the DOM if it exists
 */
export function removeLivePlayerIfExists() {
  let livePlayer = document.querySelector(".liveplayer-container");
  if (livePlayer) {
    livePlayer.remove();
  }
}

/**
 * @author bhaviksingh
 * @description For a given ClipDataObject, of type LIVE, returns DOM that shows the clips URL
 * @param {ClipDataObjet} clip
 * @return {<DIV>} livePlayerContainer
 */
function getLiveDOM(clip) {
  let livePlayerContainer = document.createElement("div");
  livePlayerContainer.classList = "liveplayer-container";

  let iframe = document.createElement("iframe");
  let url = addURLParamaters(clip.fileName);

  iframe.setAttribute("src", clip.fileName);
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("allowfullscreen", true);
  livePlayerContainer.appendChild(iframe);

  return livePlayerContainer;
}

function addURLParamaters(url) {
  let paramURL = url;
  if (paramURL.includes("twitch")) {
    let currentLocation = location.hostname;
    let hostParam = "?parent=" + currentLocation;
    paramURL = paramURL + hostParam;
  }
  return paramURL;
}
