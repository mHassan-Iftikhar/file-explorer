import app from "./appState.js";
import { FileSystemManager as fileManager } from "./fileSystemManager.js";
class BreadcrumbNavigator {
    #currentPath = [];
    #fileSystemManager = fileManager;
    #appState = app;
    constructor(fileManagerInstance, appState) {
        this.#fileSystemManager = fileManagerInstance ?? this.#fileSystemManager;
        this.#appState = appState ?? this.#appState;
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
    renderBreadcrumbs() {
    }
}
export default new BreadcrumbNavigator(fileManager, app);
//# sourceMappingURL=breadCrumbNavigator.js.map