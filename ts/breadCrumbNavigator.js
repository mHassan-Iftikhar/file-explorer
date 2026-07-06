import app from "./appState.js";
import fileManager from "./fileSystemManager.js";

class BreadcrumbNavigator {
    #currentPath = [];
    #fileSystemManager = fileManager;
    #appState = app;

    constructor(fileManager = this.#fileSystemManager, app = this.#appState) {
        this.#fileSystemManager = fileManager;
        this.#appState = app;
    }

    openFolder(folderId) {
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

    navigateToItem(id) {
        this.#currentPath.push(id);
        this.#fileSystemManager.openFolder(id);
        this.renderBreadcrumbs();
    }
}

const breadcrumbNavigator = new BreadcrumbNavigator(fileManager, app);
export default breadcrumbNavigator;