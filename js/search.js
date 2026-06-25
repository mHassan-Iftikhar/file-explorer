import { store } from "./store.js";
import ui from "./ui.js";

class SearchController {
  constructor() {
    this.searchField = document.querySelector("#command-bar-search");
    this.contentGrid = document.querySelector("#contentGrid");
  }

  flattenFolders(folders) {
    return folders.reduce((acc, folder) => {
      acc.push(folder);
      if (folder.subFolders?.length) {
        acc.push(...this.flattenFolders(folder.subFolders));
      }
      return acc;
    }, []);
  }

  debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  start() {
    if (!this.searchField || !this.contentGrid) return;

    this.searchField.addEventListener(
      "input",
      this.debounce((e) => {
        const items = store.getData();
        const searchValue = e.target.value.toLowerCase().trim();
        const allFolders = this.flattenFolders(items);

        const searchResults = allFolders.filter((item) =>
          item.name.toLowerCase().includes(searchValue)
        );

        this.contentGrid.innerHTML = "";

        if (searchValue === "") {
          ui.renderCurrentFolder();
          return;
        }

        if (searchResults.length === 0) {
          const p = document.createElement("p");
          p.className = "no-file-found";
          p.textContent = "No files found";
          this.contentGrid.appendChild(p);
          return;
        }

        searchResults.forEach((item) => ui.renderFolderItem(item));
      }, 300)
    );
  }
}

const searchController = new SearchController();

export default searchController;