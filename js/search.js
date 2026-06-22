import { store } from "./store.js";
import ui from "./ui.js";

class SearchController {
  constructor() {
    this.searchField = document.querySelector("#command-bar-search");
    this.contentGrid = document.querySelector("#contentGrid");
  }

  start() {
    if (!this.searchField) return [];

    this.searchField.addEventListener("input", (e) => {
      const items = store.getData();
      const value = e.target.value.toLowerCase().trim();

      const checkFolders = items.filter((item) =>
        item.name.toLowerCase().includes(value),
      );

      this.contentGrid.innerHTML = "";

      if (value === "") {
        ui.renderCurrentFolder();
        return;
      }

      if (checkFolders.length === 0) {
        this.contentGrid.innerHTML = '<p class="no-file-found">No files found</p>';
        const noFileFound = this.contentGrid.querySelector(".no-file-found");
        if (noFileFound) noFileFound.style.color = "#b5b5b5";
        return;
      }

      checkFolders.forEach((item) => ui.renderFolderItem(item));
    });
  }
}

const searchController = new SearchController();

export default searchController;

