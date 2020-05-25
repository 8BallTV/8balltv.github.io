export function setupRepositionListener(repositionWidget) {
    repositionWidget.addEventListener("mousedown", (e) => {
        document.addEventListener("mousemove", boxRepositionHandler);
    });
    document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove", boxRepositionHandler);
    });
    repositionWidget.addEventListener("touchstart", (e) => {
        document.addEventListener("touchmove", boxRepositionHandler);
    });
    document.addEventListener("touchend", (e) => {
        document.removeEventListener("touchmove", boxRepositionHandler);
    });
}

function boxRepositionHandler(e) {
    let box = e.target.parentNode;

    if (!box) {
        return;
    }

    if (e.type == "touchmove") {
        let touch = e.touches[0];
        box.style.left =
            calculatePosition(
                touch.pageX,
                box.clientWidth,
                document.documentElement.clientWidth
            ) + "px";
        box.style.top =
            calculatePosition(
                touch.pageY,
                box.clientHeight,
                document.documentElement.clientHeight
            ) + "px";
    } else {
        box.style.left =
            calculatePosition(e.pageX, box.offsetWidth, window.innerWidth) + "px";
        box.style.top =
            calculatePosition(e.pageY, box.offsetHeight, window.innerHeight) +
            "px";
    }
}

/**
 * @author samdealy
 * @description Ensures new position is within the bounds of the window's viewport
 * @param {Number} coordinate
 * @param {Number} boxDimension
 * @param {Number} windowDimension
 * @return {Number} (inBoundsCoordinate)
 */
function calculatePosition(coordinate, boxDimension, windowDimension) {
    if (coordinate < 0) return 0;
    if (coordinate + boxDimension > windowDimension) {
        return windowDimension - boxDimension;
    }
    return coordinate;
}