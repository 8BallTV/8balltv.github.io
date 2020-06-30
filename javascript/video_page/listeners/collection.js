/**
 * @author bhaviksingh
 * @description Register an on-click listener for the collection page
 * @listens onClick
 * @param {null}
 * @return {null}
 */
export default function registerCollectionLinkListener() {
  const homeButton = document.querySelector(".collectionlink-button");
  homeButton.addEventListener("click", (e) => {
    window.location.pathname = "/collections.html";
  });
}
