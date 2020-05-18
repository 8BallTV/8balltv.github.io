import { determineCollectionInfo_URL, determineCollectionVideos_URL } from "../utils/tsv_urls.js";
import parseTSV from "../parser/index.js";
import setClipOnVideoPlayer from "../video_page/video_player.js";
const collectionContainer = document.getElementById("collection-container");


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
    collectionList.forEach((collectionDataObject) => {
        let collectionDataDom = collectionDataObject.getDOMElement();
        collectionContainer.appendChild(collectionDataDom);
        let collectionID = collectionDataObject.id;
        collectionDataDom.addEventListener("click", (e) => {
            parseAndDisplayCollectionVideos(collectionID);
        }), false;
    });
}

function parseAndDisplayCollectionVideos(collectionID) {
    parseTSV((collectionVideoData) => displayCollectionVideos(collectionVideoData, collectionID), collectionVideo_URL);
}

function displayCollectionVideos(collectionVideoData, collectionID) {
    collectionContainer.innerHTML = "";
    let backButton = getBackButton();
    collectionContainer.appendChild(backButton);
    collectionVideoData.forEach((clipDataObject) => {
        if (clipDataObject.collectionID == collectionID) {
            let clipDataDom = clipDataObject.getDOMElement();
            collectionContainer.appendChild(clipDataDom);
            clipDataDom.addEventListener("click", (e) => {
                setClipOnVideoPlayer(null, clipDataObject);
            })
        }

    });
}

function getBackButton() {
    let parentDom = document.createElement("div");
    parentDom.innerHTML = "back";
    parentDom.addEventListener("click", () => displayCollections(cachedCollectionList));
    return parentDom;
}