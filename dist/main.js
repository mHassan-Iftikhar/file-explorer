import { UIComponents } from './uiComponents.js';
import { FolderRenderer } from './folderRenderer.js';
import { SearchController } from './searchController.js';
import { ToolbarController } from './toolBarController.js';
import { Selectors } from './constants.js';
window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
});
const ui = new UIComponents();
const folderRenderer = new FolderRenderer();
const searchController = new SearchController({
    folderRenderer,
    ui
});
const toolbarController = new ToolbarController({
    folderRenderer,
    ui
});
searchController.start();
toolbarController.sortItems(document.querySelector(Selectors.SORT_ITEMS));
toolbarController.refreshBtn(document.querySelector(Selectors.REFERESH_BUTTON));
toolbarController.renderDropdown();
toolbarController.openFolderMenu(document.querySelector(Selectors.CONTENT_GRID));
folderRenderer.render();
//# sourceMappingURL=main.js.map