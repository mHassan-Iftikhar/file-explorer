import app from "./appState.js";
import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { DropdownIds, ElementIds, Labels, Selectors, ToolbarConfig } from "./constants.js";
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

export class ToolbarController {
    #newButton: HTMLElement | null = document.querySelector(Selectors.NEW_BUTTON);
    #dropdownConfig: HTMLElement | null = document.querySelector(Selectors.NEW_DROPDOWN);
    #dropdownItems: readonly DropdownItem[] = ToolbarConfig.DROPDOWN_ITEMS;
    #folderMenuItems: readonly MenuItem[] = ToolbarConfig.FOLDER_MENU_ITEMS;
    #sortDropdownItems: readonly MenuItem[] = ToolbarConfig.SORT_DROPDOWN_ITEMS;
    #folderRenderer: FolderRenderer;
    #ui: UIComponents;
    #appState: typeof app;

    folderRenderer: FolderRenderer;
    appState: typeof app;
    dropdownConfig: HTMLElement | null;
    ui: UIComponents;
    dropdownItems: readonly DropdownItem[];
    folderMenuItems: readonly MenuItem[];
    sortDropdownItems: readonly MenuItem[];

    constructor({
        folderRenderer,
        ui,
        appState = app,
        sortDropdownItems = null,
        folderMenuItems = null,
        dropdownItems = null,
        dropdownConfig = null
    }: ToolbarControllerOptions) {
        this.folderRenderer = folderRenderer;
        this.appState = appState;
        this.dropdownConfig = dropdownConfig ?? this.#dropdownConfig;
        this.ui = ui;
        this.dropdownItems = dropdownItems ?? this.#dropdownItems;
        this.folderMenuItems = folderMenuItems ?? this.#folderMenuItems;
        this.sortDropdownItems = sortDropdownItems ?? this.#sortDropdownItems;

        this.#folderRenderer = folderRenderer;
        this.#ui = ui;
        this.#appState = appState;
    }

    renderDropdown() {
        this.#newButton?.addEventListener("click", () => this.openDropDown());
    }

    openDropDown() {
        if (!this.#dropdownConfig) return;

        this.#dropdownConfig.innerHTML = "";

        const itemsContainer = this.#ui.createElement("div");
        itemsContainer.id = ElementIds.NEW_DROPDOWN_ITEMS;

        this.#dropdownItems.forEach(item => {
            const div = this.#ui.createElement("div", "new-select");
            div.textContent = `${item.ICON} ${item.NAME}`;
            div.id = item.id;
            div.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                const target = e.currentTarget as HTMLElement;
                this.handleOptionClick(target.id);
            });
            itemsContainer.appendChild(div);
        });

        this.#dropdownConfig.appendChild(itemsContainer);
        this.#dropdownConfig.style.display = "block";

        // console.log("Dropdown items rendered.");
    }

    openFolderMenu(mainContainer: HTMLElement | null) {
        if (!mainContainer) return;

        const contextMenu = document.createElement("div");

        // contextMenu.id = "context-menu";
        contextMenu.style.backgroundColor = 'rgba(26, 26, 26, 0.6)';
        contextMenu.style.backdropFilter = 'blur(5px)';
        contextMenu.style.width = '200px';
        contextMenu.style.height = 'maxcontent';
        contextMenu.style.display = "none";
        contextMenu.style.position = 'absolute';
        contextMenu.style.padding = '10px';
        contextMenu.style.borderRadius = '8px';
        contextMenu.style.zIndex = '9999';

        document.body.appendChild(contextMenu);

        contextMenu.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const action = target.innerText;

            if (action === Labels.RENAME) {
                const targetId = contextMenu.dataset['targetId'];
                if (!targetId) return;
                const folderElement = document.getElementById(targetId);

                // console.log(targetId);
                // console.log(folderElement)

                if (folderElement) {
                    const iconDiv = folderElement.querySelector(Selectors.FOLDER_ICON);
                    const nameDiv = folderElement.querySelector<HTMLElement>(Selectors.FOLDER_NAME);

                    if (!iconDiv || !nameDiv) return;

                    const inputField = document.createElement('input') as HTMLInputElement;
                    inputField.type = 'text';
                    inputField.value = nameDiv.textContent ?? '';

                    inputField.style.backgroundColor = '#2a2a2a';
                    inputField.style.color = 'white';
                    inputField.style.border = '1px solid #555';
                    inputField.style.borderRadius = '4px';
                    nameDiv.style.display = "none";

                    iconDiv.after(inputField);

                    inputField.focus();
                    inputField.select();

                    let isSaving = false;

                    const saveRename = () => {

                        // console.log("Enter save renmae function");

                        isSaving = true;

                        // console.log("Inside save renmae function");
                        // console.log("trimmedValue before");

                        const trimmedValue = inputField.value.trim();

                        // console.log("trimmedValue after", trimmedValue);

                        if (trimmedValue && trimmedValue !== nameDiv.textContent) {
                            fileManager.renameFolder(Number(targetId), trimmedValue);
                            nameDiv.textContent = trimmedValue;
                            nameDiv.style.display = 'block';
                        }
                    };

                    inputField.addEventListener('keydown', (e: KeyboardEvent) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            isSaving = true;
                            inputField.remove();
                            nameDiv.style.display = 'block';
                        }
                    });

                    inputField.addEventListener('blur', () => {
                        saveRename();
                    });
                }
            } else if (action === Labels.DELETE) {
                const folderId = contextMenu.dataset['targetId'];
                if (!folderId) return;
                console.log(`Deleting folder with ID: ${folderId}`);
                fileManager.deleteFolder(Number(folderId));
                document.location.reload();
                contextMenu.style.display = "none";
                return;
            } else {
                console.error("Not Clickable");
                return;
            }

            contextMenu.style.display = 'none';
        });

        mainContainer.addEventListener('contextmenu', (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();

            const target = e.target as HTMLElement;
            const folderElement = target.closest<HTMLElement>(Selectors.FOLDER_ITEM);
            console.log(folderElement);

            if (!folderElement) return;

            contextMenu.dataset['targetId'] = folderElement.id;

            // if(contextMenu.dataset.targetId === folderElement.id) {
            //     console.log("After dataset.taget", contextMenu.dataset.targetId);
            // }

            const folderId = folderElement.id;

            if (!folderId || folderId === mainContainer.id) {
                return;
            }

            // console.log("Successfully detected Folder ID:", folderId);

            contextMenu.innerHTML = "";
            contextMenu.style.position = 'absolute';
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.display = "block";

            this.#folderMenuItems.forEach((item) => {
                const span = document.createElement('span');
                span.textContent = item.ITEM;
                span.className = 'menu-items';
                span.style.display = 'flex';
                span.style.flexDirection = 'column';
                span.style.fontSize = '16px';
                span.style.padding = '10px';
                span.style.borderRadius = '8px';
                span.style.color = 'rgb(223, 223, 223)';

                span.addEventListener('mouseenter', () => {
                    span.style.backgroundColor = '#313131b9';
                    // span.style.cursor = 'pointer';
                });
                span.addEventListener('mouseleave', () => {
                    span.style.backgroundColor = '';
                    // span.style.cursor = '';
                });

                contextMenu.appendChild(span);
            });
        });
        document.addEventListener('click', () => contextMenu.style.display = "none");
    }

    handleOptionClick(optionId: string) {
        if (optionId !== DropdownIds.NEW_FOLDER) return;

        if (this.dropdownConfig) {
            this.dropdownConfig.style.display = "none";
        }
        // console.log("Before Render Folder");
        this.folderRenderer.renderNewFolder();
    }

    refreshBtn(btn: HTMLElement | null) {
        if (!btn) return;
        btn.style.cursor = "default";
        btn.addEventListener("click", () => {
            document.location.reload();
        });
    }

    sortItems(el: HTMLElement | null) {
        if (!el) return;
        el.style.position = 'relative';
        const sortDropdown = document.createElement("div");
        sortDropdown.className = "sort-items_dropdown";

        sortDropdown.style.backgroundColor = 'rgba(26, 26, 26, 0.6)';
        sortDropdown.style.backdropFilter = 'blur(5px)';
        sortDropdown.style.width = "20vw";
        sortDropdown.style.height = "auto";
        sortDropdown.style.position = 'absolute';
        sortDropdown.style.top = '30px';
        sortDropdown.style.left = '10px';
        sortDropdown.style.zIndex = '99999';

        // document.body.appendChild(sortDropdown);
        // console.log(el);
        el.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            console.log(sortDropdown, "clicked!");
            this.sortDropdownItems.forEach((item) => {
                const span = document.createElement('span');
                span.textContent = item.ITEM;
                sortDropdown.appendChild(span);

                // console.log(item.item);
            });
            el.appendChild(sortDropdown);
        });
    }
}