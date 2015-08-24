// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {tweet2blog: "tweet2blog"}, function(response) {
      console.log("executionStatus: " + response.executionStatus);
    });
  });

});
