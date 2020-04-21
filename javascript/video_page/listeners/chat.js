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

function registerChatRepositionListener() {
    const chatRepositionWidget = document.querySelector("#chat-positioning");
    const chatBox = document.querySelector(".chat-box");
    let chatDragState = false;
    chatRepositionWidget.addEventListener("mousedown", (e) => {
        chatDragState = true;
    });
    document.addEventListener("mouseup", (e) => {
        chatDragState = false;
    });
    document.addEventListener("mousemove", (e) => {
        if (chatDragState == true) {
            chatBox.style.left = e.pageX + "px";
            chatBox.style.top = e.pageY + "px";
        }
    });
}