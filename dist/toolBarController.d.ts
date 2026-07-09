import app from "./appState.js";
import type { FolderRenderer } from "./folderRenderer.js";
import type { UIComponents } from "./uiComponents.js";
import type { DropdownItem, MenuItem } from "./types.js";
interface ToolbarControllerOptions {
    folderRenderer: FolderRenderer;
    ui: UIComponents;
    appState?: typeof app;
    sortDropdownItems?: readonly MenuItem[] | null;
    folderMenuItems?: readonly MenuItem[] | null;
    dropdownItems?: readonly DropdownItem[] | null;
    dropdownConfig?: HTMLElement | null;
}
export declare class ToolbarController {
    #private;
    folderRenderer: FolderRenderer;
    appState: typeof app;
    dropdownConfig: HTMLElement | null;
    ui: UIComponents;
    dropdownItems: readonly DropdownItem[];
    folderMenuItems: readonly MenuItem[];
    sortDropdownItems: readonly MenuItem[];
    constructor({ folderRenderer, ui, appState, sortDropdownItems, folderMenuItems, dropdownItems, dropdownConfig }: ToolbarControllerOptions);
    renderDropdown(): void;
    openDropDown(): void;
    openFolderMenu(mainContainer: HTMLElement | null): void;
    handleOptionClick(optionId: string): void;
    refreshBtn(btn: HTMLElement | null): void;
    sortItems(el: HTMLElement | null): void;
}
export {};
//# sourceMappingURL=toolBarController.d.ts.map