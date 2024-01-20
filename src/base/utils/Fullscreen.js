var fullscreenElementNames = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement",
]

var fullscreenMethodNames = [
    "requestFullscreen",
    "msRequestFullscreen",
    "mozRequestFullScreen",
    "webkitRequestFullscreen",
]
var unFullscreenMethodNames = [
    "exitFullscreen",
    "msExitFullscreen",
    "mozCancelFullScreen",
    "webkitExitFullscreen"
]


function getExistedAttr(
    element,
    attrNames,
) {
    for (var attrName of attrNames) {
        var attribute = element[attrName]
        if (attribute)
            return attribute
    }
    return undefined
}
export var isFullscrened = () => {
    var fullscreened = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    )
    return fullscreened
}


export function toggleFullscreenElement(element) {
    var fullscreened = isFullscrened()

    var currentElement = fullscreened ? element: document
    var currentMethodNames = fullscreened ? fullscreenElementNames: unFullscreenMethodNames

    var method = getExistedAttr(currentElement, currentMethodNames)

    if (!method) {
        console.error("Fullscreen method not available.");
        return undefined;
    }

    try {
        method.call(currentElement);
        
    } catch (error) {
        console.error("Error toggling fullscreen:", error);
        return undefined;
    }
}


var Fullscreen = {
    toggle: toggleFullscreenElement,
    isFullscrened,
    
}

export default Fullscreen;
