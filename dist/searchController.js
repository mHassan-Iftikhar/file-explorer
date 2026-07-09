import store from "./storageBase.js";
import { Labels, Selectors } from "./constants.js";
export class SearchController {
    #searchField = document.querySelector(Selectors.COMMAND_BAR);
    #storage;
    #folderRenderer;
    #ui;
    constructor({ storage = store, folderRenderer, ui }) {
        this.#storage = storage;
        this.#folderRenderer = folderRenderer;
        this.#ui = ui;
    }
    start() {
        this.#searchField?.addEventListener("input", (e) => {
            const target = e.target;
            this.handleSearch(target.value);
        });
    }
    handleSearch(query) {
        if (!query.trim()) {
            return;
        }
        const allFolders = this.#storage.getData("folders");
        const filteredItems = (allFolders ?? []).filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        this.displayResults(filteredItems);
    }
    displayResults(items) {
        this.#ui.clear();
        if (!items || items.length === 0) {
            if (this.#ui.container) {
                this.#ui.container.textContent = Labels.NO_RESULTS;
            }
            return;
        }
        items.forEach((item) => this.#folderRenderer.renderItem(item));
    }
}
//# sourceMappingURL=searchController.js.map