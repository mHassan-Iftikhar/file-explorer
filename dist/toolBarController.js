import app from "./appState.js";
import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { DropdownIds, ElementIds, Labels, Selectors, ToolbarConfig } from "./constants.js";
export class ToolbarController {
    #newButton = document.querySelector(Selectors.NEW_BUTTON);
    #dropdownConfig = document.querySelector(Selectors.NEW_DROPDOWN);
    #dropdownItems = ToolbarConfig.DROPDOWN_ITEMS;
    #folderMenuItems = ToolbarConfig.FOLDER_MENU_ITEMS;
    #sortDropdownItems = ToolbarConfig.SORT_DROPDOWN_ITEMS;
    #folderRenderer;
    #ui;
    #appState;
    folderRenderer;
    appState;
    dropdownConfig;
    ui;
    dropdownItems;
    folderMenuItems;
    sortDropdownItems;
    constructor({ folderRenderer, ui, appState = app, sortDropdownItems = null, folderMenuItems = null, dropdownItems = null, dropdownConfig = null }) {
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
        if (!this.#dropdownConfig)
            return;
        this.#dropdownConfig.innerHTML = "";
        const itemsContainer = this.#ui.createElement("div");
        itemsContainer.id = ElementIds.NEW_DROPDOWN_ITEMS;
        this.#dropdownItems.forEach(item => {
            const div = this.#ui.createElement("div", "new-select");
            div.textContent = `${item.ICON} ${item.NAME}`;
            div.id = item.id;
            div.addEventListener("click", (e) => {
                e.stopPropagation();
                const target = e.currentTarget;
                this.handleOptionClick(target.id);
            });
            itemsContainer.appendChild(div);
        });
        this.#dropdownConfig.appendChild(itemsContainer);
        this.#dropdownConfig.style.display = "block";
    }
    openFolderMenu(mainContainer) {
        if (!mainContainer)
            return;
        const contextMenu = document.createElement("div");
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
        contextMenu.addEventListener('click', (e) => {
            const target = e.target;
            const action = target.innerText;
            if (action === Labels.RENAME) {
                const targetId = contextMenu.dataset['targetId'];
                if (!targetId)
                    return;
                const folderElement = document.getElementById(targetId);
                if (folderElement) {
                    const iconDiv = folderElement.querySelector(Selectors.FOLDER_ICON);
                    const nameDiv = folderElement.querySelector(Selectors.FOLDER_NAME);
                    if (!iconDiv || !nameDiv)
                        return;
                    const inputField = document.createElement('input');
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
                        isSaving = true;
                        const trimmedValue = inputField.value.trim();
                        if (trimmedValue && trimmedValue !== nameDiv.textContent) {
                            fileManager.renameFolder(Number(targetId), trimmedValue);
                            nameDiv.textContent = trimmedValue;
                            nameDiv.style.display = 'block';
                        }
                    };
                    inputField.addEventListener('keydown', (e) => {
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
            }
            else if (action === Labels.DELETE) {
                const folderId = contextMenu.dataset['targetId'];
                if (!folderId)
                    return;
                console.log(`Deleting folder with ID: ${folderId}`);
                fileManager.deleteFolder(Number(folderId));
                document.location.reload();
                contextMenu.style.display = "none";
                return;
            }
            else {
                console.error("Not Clickable");
                return;
            }
            contextMenu.style.display = 'none';
        });
        mainContainer.addEventListener('contextmenu', (e) => {
            e.stopPropagation();
            e.preventDefault();
            const target = e.target;
            const folderElement = target.closest(Selectors.FOLDER_ITEM);
            console.log(folderElement);
            if (!folderElement)
                return;
            contextMenu.dataset['targetId'] = folderElement.id;
            const folderId = folderElement.id;
            if (!folderId || folderId === mainContainer.id) {
                return;
            }
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
                });
                span.addEventListener('mouseleave', () => {
                    span.style.backgroundColor = '';
                });
                contextMenu.appendChild(span);
            });
        });
        document.addEventListener('click', () => contextMenu.style.display = "none");
    }
    handleOptionClick(optionId) {
        if (optionId !== DropdownIds.NEW_FOLDER)
            return;
        if (this.dropdownConfig) {
            this.dropdownConfig.style.display = "none";
        }
        this.folderRenderer.renderNewFolder();
    }
    refreshBtn(btn) {
        if (!btn)
            return;
        btn.style.cursor = "default";
        btn.addEventListener("click", () => {
            document.location.reload();
        });
    }
    sortItems(el) {
        if (!el)
            return;
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
        el.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log(sortDropdown, "clicked!");
            this.sortDropdownItems.forEach((item) => {
                const span = document.createElement('span');
                span.textContent = item.ITEM;
                sortDropdown.appendChild(span);
            });
            el.appendChild(sortDropdown);
        });
    }
}
//# sourceMappingURL=toolBarController.js.map