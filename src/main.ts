import { UIComponents } from './uiComponents.js';
import { FolderRenderer } from './folderRenderer.js';
import { SearchController } from './searchController.js';
import { ToolbarController } from './toolBarController.js';
import { Selectors } from './constants.js';

window.addEventListener("contextmenu", (e: MouseEvent) => {
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
toolbarController.sortItems(document.querySelector<HTMLElement>(Selectors.SORT_ITEMS));
toolbarController.refreshBtn(document.querySelector<HTMLElement>(Selectors.REFERESH_BUTTON));
toolbarController.renderDropdown();
toolbarController.openFolderMenu(document.querySelector<HTMLElement>(Selectors.CONTENT_GRID));

folderRenderer.render();