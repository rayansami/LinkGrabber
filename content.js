// Will grab link nodes (a-tag)
let elementGrabber = function () {

    registerEvents();

    function registerEvents() {
        // If Control or Command key is pressed and the S key is pressed
        // run save function. 83 is the key code for S.
        document.addEventListener('keydown', function (e) {
            // When S is pressed
            if (e.which == 83) {
                e.preventDefault();

                let attribtues_of_element = {}
                
                
                // Selection: window.getSelection() method returns a Selection object representing the range of text selected by the user or the current position of the caret
                // The Selection.getRangeAt() method returns a range object representing one of the ranges currently selected
                // The Range.cloneContents() returns a DocumentFragment copying the objects of type Node included in the Range
                let element = window.getSelection().getRangeAt(0).cloneContents().querySelector('a');

                // Create a JSON using the attribtue values 
                attribtues_of_element["href"] = element.getAttribute("href");
                attribtues_of_element["rel"] = element.getAttribute("rel");
                attribtues_of_element["class"] = element.getAttribute("class");
                attribtues_of_element["target"] = element.getAttribute("target");
                attribtues_of_element["text"] = element.textContent;

                // Listens to the connection from extension.js
                chrome.runtime.onConnect.addListener((port) => {
                    // Send the content to the extension.js 
                    port.postMessage({
                        attributes: attribtues_of_element
                    });
                });
            }
        });
    }
}();