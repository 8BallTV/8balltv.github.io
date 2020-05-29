import {
    determineCollectionInfo_URL,
    determineCollectionVideos_URL,
} from "../utils/tsv_urls.js";
import parseTSV from "../parser/index.js";
import setClipOnVideoPlayer from "../video_page/video_player.js";
import { showVideoPlayer } from "../video_page/video_player.js";
const collectionContainer = document.getElementById("collection-container");
const collectionStatusContainer = document.getElementById("connecting-type");
const collectionBox = document.getElementById("collectionbox-container");

const collectionInfo_URL = determineCollectionInfo_URL();
const collectionVideo_URL = determineCollectionVideos_URL();

let cachedCollectionList, cachedVideoList;

/**
 * @author bhaviksingh
 * @description Sets of parsing of TSV for collections, and displays them within container
 * @param {null}
 * @return {null}
 */
export default function parseAndDisplayCollections() {
    parseTSV(cacheAndDisplayCollections, collectionInfo_URL, "collections");
}

function cacheAndDisplayCollections(collectionList) {
    cachedCollectionList = collectionList;
    displayCollections(collectionList);
}

/**
 * @author bhaviksingh
 * @description Takes a list of CollectionInfo objects and displays them in the container
 * @param {Array} collectionList
 * @return null
 */
function displayCollections(collectionList) {
    collectionContainer.innerHTML = "";
    collectionBox.style.visibility = "visible";
    collectionStatusContainer.innerHTML = "select a video";

    let titleDom = getTitleDOM("Collections");
    collectionContainer.appendChild(titleDom);

    collectionList.forEach((collectionDataObject) => {
        let collectionDataDom = collectionDataObject.getDOMElement();
        collectionContainer.appendChild(collectionDataDom);
        let collectionID = collectionDataObject.id;
        let collectionName = collectionDataObject.name;

        collectionDataDom.addEventListener("click", (e) => {
                parseAndDisplayCollectionVideos(collectionID, collectionName);
            }),
            false;
    });
}

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
            let clipDataDom = clipDataObject.getDOMElement();
            collectionContainer.appendChild(clipDataDom);
            clipDataDom.addEventListener("click", (e) => {
                playCollectionVideo(clipDataObject);
            });
        }
    });
}

function playCollectionVideo(clipDataObject) {
    showVideoPlayer();
    setClipOnVideoPlayer(null, clipDataObject);
    collectionBox.style.visibility = "hidden";
}

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