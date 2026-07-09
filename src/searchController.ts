import store from "./storageBase.js";
import { Labels, Selectors } from "./constants.js";
import type { FolderItem } from "./types.js";
import type { FolderRenderer } from "./folderRenderer.js";
import type { UIComponents } from "./uiComponents.js";

interface SearchControllerOptions {
    storage?: typeof store;
    folderRenderer: FolderRenderer;
    ui: UIComponents;
}

export class SearchController {
    #searchField: HTMLInputElement | null = document.querySelector<HTMLInputElement>(Selectors.COMMAND_BAR);
    #storage: typeof store;
    #folderRenderer: FolderRenderer;
    #ui: UIComponents;

    constructor({ storage = store, folderRenderer, ui }: SearchControllerOptions) {
        this.#storage = storage;
        this.#folderRenderer = folderRenderer;
        this.#ui = ui;
    }

    start() {
        // console.log("Before Start")
        this.#searchField?.addEventListener("input", (e: Event) => {
            const target = e.target as HTMLInputElement;
            this.handleSearch(target.value);
        });
        // console.log("After Start");
    }

    handleSearch(query: string) {
        // console.log("Search query:", query);
        if (!query.trim()) {
            return;
        }

        // console.log("Searching for:", query);

        const allFolders = this.#storage.getData("folders") as FolderItem[] | null;
        const filteredItems = (allFolders ?? []).filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
        // console.log("Filtered items:", filteredItems);
        this.displayResults(filteredItems);
    }

    displayResults(items: FolderItem[]) {
        // console.log("Displaying results:", items);
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
