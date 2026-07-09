import app from "./appState.js";
import { FileSystemManager as fileManager } from "./fileSystemManager.js";

class BreadcrumbNavigator {
    #currentPath: number[] = [];
    #fileSystemManager = fileManager;
    #appState = app;

    constructor(fileManagerInstance?: typeof fileManager, appState?: typeof app) {
        this.#fileSystemManager = fileManagerInstance ?? this.#fileSystemManager;
        this.#appState = appState ?? this.#appState;
    }

    openFolder(folderId: number) {
        this.#currentPath.push(folderId);
        this.#fileSystemManager.openFolder(folderId);
        this.renderBreadcrumbs();
    }

    goBack() {
        this.#currentPath.pop();
        this.#fileSystemManager.goBack();
        this.renderBreadcrumbs();
    }

    navigateToHome() {
        this.#currentPath = [];
        this.#fileSystemManager.openFolder(null);
        this.renderBreadcrumbs();
    }

    navigateToItem(id: number) {
        this.#currentPath.push(id);
        this.#fileSystemManager.openFolder(id);
        this.renderBreadcrumbs();
    }

    private renderBreadcrumbs() {
        // TODO: Implement breadcrumb rendering
    }
}

export default new BreadcrumbNavigator(fileManager, app);