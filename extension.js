let list = document.getElementById('extension-list');

// Build an anchor tag and wrap it with li
function buildElement(attributes){
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = attributes.href;
    
    if(attributes.rel){
        a.rel = attributes.rel;    
    }
    if(attributes.class){
        a.classList = attributes.class;
    }
    
    if(attributes.target){
        a.target = attributes.target;
    }
    
    a.text = attributes.text;  
    li.append(a)
    return li;
}

// Wait till loading the page to initiate connection  
window.addEventListener('load', (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // Connect to the active tab
        const port = chrome.tabs.connect(tabs[0].id);

        // Listens for the message from the content.js
        port.onMessage.addListener((response) => {      
          // Build the element using the existing attributes      
          let element = buildElement(response.attributes);
          // Add to the list in Extension                  
          list.append(element);       
        });
      });
  });