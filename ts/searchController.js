import store from "./storageBase.js";
import { folderRenderer, ui } from "./uiComponents.js";

class SearchController {
    #searchField = document.querySelector("#command-bar-search");
    #storage = store;
    #folderRenderer = folderRenderer;
    #debounceDelay = 300;
    #ui = ui;

    constructor(storage = this.#storage, folderRenderer = this.#folderRenderer, debounceDelay = this.#debounceDelay, ui = this.#ui) {
        this.storage = storage;
        this.folderRenderer = folderRenderer;
        this.ui = ui;
        this.debounceDelay = debounceDelay;
    }

    start() {
        // console.log("Before Start")
        this.#searchField.addEventListener("input", (e) => this.handleSearch(e.target.value));
        // console.log("After Start");
    }

    handleSearch(query) {
        // console.log("Search query:", query);
        if (!query.trim()) {
            // const noSearch = this.storage.getData("folders");
            // noSearch.forEach((item) => {
            //     const container = document.getElementById("contentGrid");
            //     container.append(this.folderRenderer.renderItem(item));
            // })
            return;
        }

        console.log("Searching for:", query);

        const filteredItems = this.storage.getData("folders").filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        // console.log("Filtered items:", filteredItems);
        this.displayResults(filteredItems);
    }

    displayResults(items) {
        // console.log("Displaying results:", items);
        this.ui.clear();
        if (!items || items.length === 0) {
            this.ui.container.textContent = "No results found.";
            return;
        }
        items.forEach((item) => this.folderRenderer.renderItem(item));
    }
}

const searchController = new SearchController();
searchController.start();
export default searchController;