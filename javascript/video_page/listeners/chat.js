/**
* @author samdealy
* @description Register an on-click listener for the chat button that hides or
*   displays the chat box.
* @listens onClick
* @param {null}
* @return {null}
*/
export default function registerChatButtonListener() {
  const chatButton = document.querySelector(".chat-button");
  const chatBox = document.querySelector(".chat-box");
  chatButton.addEventListener('click', e => {
    if (window.getComputedStyle(chatBox).visibility === "hidden") {
      chatBox.style.visibility = "visible";
    } else {
      chatBox.style.visibility = "hidden";
   }
  });
}
