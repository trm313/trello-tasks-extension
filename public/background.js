const jsLocation = "./static/js/bundle.js";
const cssLocation = "./static/css/main.css";

function isTeamHomepage(url) {
  let tabUrlArr = url.split("//")[1].split("/");
  if (tabUrlArr[0] == "trello.com" && tabUrlArr[2] == "home") {
    return true;
  } else {
    return false;
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let validUrl = isTeamHomepage(tab.url);

  if (
    validUrl &&
    ((changeInfo.title && changeInfo.title.split(" ")[0] !== "Boards") ||
      changeInfo.status === "complete")
  ) {
    setTimeout(() => {
      console.log("Loading TrelloTasks extension");
      if (jsLocation !== null) {
        chrome.tabs.executeScript(tabId, {
          file: jsLocation,
          runAt: "document_end"
        });
      }

      if (cssLocation !== null) {
        chrome.tabs.executeScript(tabId, {
          file: cssLocation,
          runAt: "document_end"
        });
      }
    }, 500);
  }
});
