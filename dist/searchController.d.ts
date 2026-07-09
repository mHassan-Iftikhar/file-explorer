import store from "./storageBase.js";
import type { FolderItem } from "./types.js";
import type { FolderRenderer } from "./folderRenderer.js";
import type { UIComponents } from "./uiComponents.js";
interface SearchControllerOptions {
    storage?: typeof store;
    folderRenderer: FolderRenderer;
    ui: UIComponents;
}
export declare class SearchController {
    #private;
    constructor({ storage, folderRenderer, ui }: SearchControllerOptions);
    start(): void;
    handleSearch(query: string): void;
    displayResults(items: FolderItem[]): void;
}
export {};
//# sourceMappingURL=searchController.d.ts.map