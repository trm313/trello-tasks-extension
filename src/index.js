import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const EXT_ROOT = "trm-trello-tasks-extension";
// Prevents any duplicates by removing existing EXT_ROOT
var onPage = document.getElementById(EXT_ROOT);
if (onPage) {
  onPage.parentNode.removeChild(onPage);
}

const anchor = document.createElement("div");
anchor.id = EXT_ROOT;

// console.log("Searching for root content-all-boards");
// console.log(document.getElementsByClassName("content-all-boards"));
let parent = document.getElementsByClassName("content-all-boards")[0];
if (parent) {
  // console.log("Root found", parent);
  parent.prepend(anchor);

  ReactDOM.render(<App />, document.getElementById(EXT_ROOT));
  registerServiceWorker();
} else {
  // console.log("Root not found", parent);
}
