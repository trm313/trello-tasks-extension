import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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

var elements = document.getElementsByClassName("content-all-boards");
// TODO: Fix bug for intermittend injection failure
// console.log("index.js>elements (content-all-boards selector)", elements);
var uploaderDiv = elements[0];
elements[0].insertBefore(anchor, uploaderDiv.children[0]);

ReactDOM.render(<App />, document.getElementById(EXT_ROOT));
registerServiceWorker();
