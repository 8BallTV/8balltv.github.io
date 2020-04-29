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
    chatButton.addEventListener("click", (e) => {
        if (window.getComputedStyle(chatBox).visibility === "hidden") {
            chatBox.style.visibility = "visible";
        } else {
            chatBox.style.visibility = "hidden";
        }
    });
    registerChatRepositionListener();
}

/**
 * @author bhaviksingh
 * @description Register listeners that enable the chatBox to be moved on both desktop and mobile
 * @listens mousedown, mouseup, touchstart, touchend
 * @param {null}
 * @return {null}
 */
function registerChatRepositionListener() {
    const chatRepositionWidget = document.querySelector("#chat-positioning");
    chatRepositionWidget.addEventListener("mousedown", (e) => {
        document.addEventListener("mousemove", chatRepositionHandler);
    });
    document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", chatRepositionHandler);
    });
    chatRepositionWidget.addEventListener("touchstart", (e) => {
        document.addEventListener("touchmove", chatRepositionHandler);
    });
    document.addEventListener("touchend", (e) => {
        document.removeEventListener("touchmove", chatRepositionHandler);
    });
}

/**
 * @author bhaviksingh
 * @description Handles callback for chat repositioning, moving the chatbox to the right place
 * @listens touchmove, mousemove
 * @param {null}
 * @return {null}
 */
function chatRepositionHandler(e) {
    const chatBox = document.querySelector(".chat-box");
    if (e.type == "touchmove") {
        let touch = e.touches[0];
        chatBox.style.left = touch.pageX + "px";
        chatBox.style.top = touch.pageY + "px";
    } else {
      chatBox.style.left =
        calculatePosition(e.pageX, chatBox.offsetWidth, window.innerWidth) + "px";
      chatBox.style.top =
        calculatePosition(e.pageY, chatBox.offsetHeight, window.innerHeight) + "px";
   }
}

/**
 * @author samdealy
 * @description Ensures new position is within the bounds of the window's viewport
 * @param {Number} coordinate
 * @param {Number} chatBox
 * @return {Number} (inBoundsCoordinate)
 */
function calculatePosition(coordinate, chatBoxDimension, windowDimension) {
  if(coordinate < 0) return 0;
  if(coordinate + chatBoxDimension > windowDimension) {
    return windowDimension - chatBoxDimension;
  }
  return coordinate;
}

