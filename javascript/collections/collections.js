import {
  determineCollectionInfo_URL,
  determineCollectionVideos_URL,
} from "../utils/tsv_urls.js";
import parseTSV from "../parser/index.js";
import { setCollectionClipOnVideoPlayer } from "../video_page/video_player.js";
import { showVideoPlayer } from "../video_page/video_player.js";
const collectionContainer = document.getElementById("collection-container");
const collectionStatusContainer = document.getElementById("connecting-type");
const collectionBox = document.getElementById("collectionbox-container");

const collectionInfo_URL = determineCollectionInfo_URL();
const collectionVideo_URL = determineCollectionVideos_URL();

let cachedVideoList, cachedCollectionList;

/**
 * @author bhaviksingh
 * @description Sets of parsing of TSV for collections, and displays them within container
 * @param {null}
 * @return {null}
 */
export default function parseAndDisplayCollections() {
  parseTSV(displayCollections, collectionInfo_URL, "collections");
}

/**
 * @author bhaviksingh
 * @description Takes a list of CollectionInfo objects and displays them in the DOM container. Also sets up click events for each collection
 * @param {Array<CollectionDataObject>} collectionList A list of CollectionDataObjects that contain necessary information to display a Collection
 * @listens Adds click events to each collection DOM
 * @return null
 */
function displayCollections(collectionList) {
  cachedCollectionList = collectionList;
  collectionContainer.innerHTML = "";
  collectionBox.style.visibility = "visible";
  collectionStatusContainer.innerHTML = "select a video";

  let titleDom = getTitleDOM("Collections");
  collectionContainer.appendChild(titleDom);

  collectionList.forEach((collectionDataObject) => {
    let collectionDataDom = collectionDataObject.getCollectionInformationDOM();
    collectionContainer.appendChild(collectionDataDom);
    let collectionID = collectionDataObject.id;
    let collectionName = collectionDataObject.name;
    collectionDataDom.addEventListener("click", (e) => {
      parseAndDisplayCollectionVideos(collectionID, collectionName);
    }),
      false;
  });
}

/**
 * @author bhaviksingh
 * @description For a given Collection, gather and parse the clips (videos) for for that collection, and trigger display when finished
 * @param {String} collectionID The ID of the collection for which we want to show videos
 * @param {String} collectionName The Name of the collection we want to show videos
 */
function parseAndDisplayCollectionVideos(collectionID, collectionName) {
  parseTSV(
    (collectionVideoData) =>
      displayCollectionVideos(
        collectionVideoData,
        collectionID,
        collectionName
      ),
    collectionVideo_URL
  );
}

/**
 * @author bhaviksingh
 * @description Given a list of clips, display the clip in the DOM if they are part of the right collection
 * @listens click For each clip displayed in DOM, on click trigger clip playback
 * @param {Array<ClipDataObject>} collectionVideoData A list of clips (videos) from within a collection
 * @param {String} collectionID The ID for the collection we want to view views for
 * @param {String} collectionName The name for the collection we are viewing
 */
function displayCollectionVideos(
  collectionVideoData,
  collectionID,
  collectionName
) {
  collectionContainer.innerHTML = "";

  let backButton = getBackButton();
  collectionContainer.appendChild(backButton);

  let titleDom = getTitleDOM(collectionName);
  collectionContainer.appendChild(titleDom);

  collectionVideoData.forEach((clipDataObject) => {
    if (clipDataObject.collectionID == collectionID) {
      let clipDataDom = clipDataObject.getClipInformationDOM();
      collectionContainer.appendChild(clipDataDom);
      clipDataDom.addEventListener("click", (e) => {
        playCollectionVideo(clipDataObject);
      });
    }
  });
}

/**
 * @author bhaviksingh
 * @description Given a clipDataObject, plays the clip in the video player and hides the collection box
 * @param {ClipDataObject} clipDataObject
 */
function playCollectionVideo(clipDataObject) {
  setCollectionClipOnVideoPlayer(clipDataObject);
  collectionBox.style.visibility = "hidden";
}

/**
 * @author bhaviksingh
 * @description Creates a back button to enable user to navigate between list of videos within a collection, and collection list
 * @listens click Attaches even listener to the Back button, on click displays cached collectionList
 * @returns {DOM} parentDom
 */
function getBackButton() {
  let parentDom = document.createElement("div");
  parentDom.classList = "back";
  parentDom.innerHTML = "back";
  parentDom.addEventListener("click", () =>
    displayCollections(cachedCollectionList)
  );
  return parentDom;
}

/**
 * @author bhaviksingh
 * @description Generates a DOM for the "Title" seection of the collectionContainer
 * @param {string} title for DOM
 * @return null
 */
function getTitleDOM(title) {
  let titleContainer = document.createElement("div");
  titleContainer.classList = "collection-title";
  titleContainer.innerHTML = title;
  return titleContainer;
}
