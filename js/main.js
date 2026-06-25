import searchController from "./search.js";
import ui from "./ui.js";
import "./action-bar-dropdowns.js";
import "./nav-pane.js";
import "./actions-btn.js";
import "./taskBar.js";
import "./details.js";

const newFolder = document.querySelector(".new-folder");

if (newFolder) {
  newFolder.addEventListener("click", (e) => {
    e.preventDefault();
    ui.renderFolder();
  });
}

window.addEventListener("explorer:navigate", () => {
  ui.renderCurrentFolder();
});

ui.renderCurrentFolder();
searchController.start();