import { setupRepositionListener } from "../../utils/repositioning.js";

/**
 * @author samdealy
 * @description Register an on-click listener for the chat button that hides or
 *   displays the chat box.
 * @listens onClick
 * @param {null}
 * @return {null}
 */

// visibility is commented out below so that nothing happens when you click the chat button - Kevin

export default function registerChatButtonListener() {
  const chatButton = document.querySelector(".chat-button");
  const chatBox = document.getElementById("chatbox-container");
  chatButton.addEventListener("click", (e) => {
    if (window.getComputedStyle(chatBox).visibility === "hidden") {
    //   chatBox.style.visibility = "visible";
    // } else {
      chatBox.style.visibility = "hidden";
    }
  });
  const chatRepositionWidget = document.querySelector("#chat-positioning");
  setupRepositionListener(chatRepositionWidget);
}