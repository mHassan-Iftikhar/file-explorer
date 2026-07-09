import app from "./appState.js";
import { FileSystemManager as fileManager } from "./fileSystemManager.js";
declare class BreadcrumbNavigator {
    #private;
    constructor(fileManagerInstance?: typeof fileManager, appState?: typeof app);
    openFolder(folderId: number): void;
    goBack(): void;
    navigateToHome(): void;
    navigateToItem(id: number): void;
    private renderBreadcrumbs;
}
declare const _default: BreadcrumbNavigator;
export default _default;
//# sourceMappingURL=breadCrumbNavigator.d.ts.map