/** @const @type = HTMLElement */
const infoModal = document.querySelector(".infos");
let isModalVisible = false;

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
  titleBox.addEventListener("click", (e) => {
    const infoModal = document.querySelector(".infos");
    infoModal.style.display = isModalVisible ? "block" : "none";
    // Allows us to close to the modal if it's open, and open the modal
    // if it's closed.
    isModalVisible = !isModalVisible;
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
  xIcon.addEventListener("click", (e) => {
    infoModal.style.display = "none";
  });
}
