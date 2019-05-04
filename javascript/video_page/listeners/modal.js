/** @const @type = HTMLElement */
const infoModal = document.querySelector(".infos");

/**
* @author samdealy
* @description Register on-click listeners for opening and closing
*   the modal
* @listens onClick
* @param {null}
* @return {null}
*/
export default function registerModalListeners() {
  openModalListener();
  closeModalListener();
}

/**
* @author samdealy
* @description Register on-click listeners for opening the modal.
* @listens onClick
* @param {null}
* @return {null}
*/
function openModalListener() {
  const titleBox = document.querySelector(".titlebox");
  titleBox.addEventListener('click', e => {
    const infoModal = document.querySelector(".infos");
    infoModal.style.display = "block";
  });
}

/**
* @author samdealy
* @description Register on-click listeners for closing the modal.
* @listens onClick
* @param {null}
* @return {null}
*/
function closeModalListener() {
  const xIcon = document.getElementById("close_modal");
  xIcon.addEventListener('click', e => {
    infoModal.style.display = "none";
  });}
