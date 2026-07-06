import store from "./storageBase.js";
import { FolderRenderer, UI } from "./uiComponents.js";

class SearchController {
    #searchField = document.querySelector("#command-bar-search");
    #storage = store;
    #folderRenderer = new FolderRenderer();
    #debounceDelay = 300;
    #ui = new UI();
    
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
        if(!items || items.length === 0) {
            this.#ui.container.textAlign = "center";
            this.ui.container.textContent = "No results found.";
            return;
        }
        items.forEach((item) => this.folderRenderer.renderItem(item));
    }
}

const searchController = new SearchController();
searchController.start();
export default searchController;