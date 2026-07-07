import { folderRenderer, ui } from "./uiComponents.js";
import app from "./appState.js";
import fileManager from "./fileSystemManager.js";

class ToolbarController {
    #newButton = document.querySelector(".create-new-items");
    #dropdownConfig = document.querySelector("#new-dropdown");
    #dropdownItems = [
        {
            icon: "📁",
            name: "New Folder",
            id: "newFolder"
        },
        {
            icon: "📄",
            name: "New File",
            id: "newFile"
        },
        {
            icon: "📂",
            name: "New Document",
            id: "newDocument"
        }
    ]
    #folderMenuItems = [
        {
            item: "Rename"
        },
        {
            item: "Delete"
        }
    ]
    #folderRenderer = folderRenderer;
    #ui = ui;
    #appState = app;

    constructor(folderRenderer = this.#folderRenderer, folderMenuItems = this.#folderMenuItems, appState = this.#appState, dropdownConfig = this.#dropdownConfig, ui = this.#ui, dropdownItems = this.#dropdownItems) {
        this.folderRenderer = folderRenderer;
        this.appState = appState;
        this.dropdownConfig = dropdownConfig;
        this.ui = ui;
        this.dropdownItems = dropdownItems;
        this.folderMenuItems = folderMenuItems;
    }

    renderDropdown() {
        this.#newButton.addEventListener("click", () => this.openDropDown());
    }

    openDropDown() {
        this.dropdownConfig.innerHTML = "";

        const itemsContainer = this.ui.createElement("div");
        itemsContainer.id = "new-dropdown-items";

        this.#dropdownItems.forEach(item => {
            const div = this.ui.createElement("div", "new-select");
            div.textContent = `${item.icon} ${item.name}`;
            div.id = item.id;
            div.addEventListener("click", (e) => {
                e.stopPropagation();
                this.handleOptionClick(e.currentTarget.id);
            });
            itemsContainer.appendChild(div);
        });

        this.#dropdownConfig.appendChild(itemsContainer);
        this.#dropdownConfig.style.display = "block";

        // console.log("Dropdown items rendered.");
    }

    openFolderMenu(mainContainer) {
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

        // mainContainer.appendChild(contextMenu);
        document.body.appendChild(contextMenu);

        contextMenu.addEventListener('click', (e) => {
            const action = e.target.innerText;

            if (action === 'Rename') {
                const targetId = contextMenu.dataset.targetId;
                const folderElement = document.getElementById(targetId);

                // console.log(targetId);
                // console.log(folderElement)

                if (folderElement) {
                    const iconDiv = folderElement.querySelector(".folder-item__icon");
                    const nameDiv = folderElement.querySelector(".folder-item__name");

                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.value = nameDiv.textContent;

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
                    }

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
            } else if (action === 'Delete') {
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

        mainContainer.addEventListener('contextmenu', (e) => {
            e.stopPropagation();
            e.preventDefault();

            const folderElement = e.target.closest('div.folder-item');
            console.log(folderElement);

            contextMenu.dataset.targetId = folderElement.id;

            // if(contextMenu.dataset.targetId === folderElement.id) {
            //     console.log("After dataset.taget", contextMenu.dataset.targetId);   
            // }

            const folderId = folderElement ? folderElement.id : null;

            if (!folderId || folderId === mainContainer.id) {
                return;
            }

            // console.log("Successfully detected Folder ID:", folderId);

            const rect = contextMenu.getBoundingClientRect();

            // console.log("Rect: ",rect);

            contextMenu.innerHTML = "";
            contextMenu.style.position = 'absolute';
            contextMenu.style.top = `${e.clientY}px`;
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.display = "block";

            this.#folderMenuItems.forEach((item) => {
                const span = document.createElement('span');
                span.textContent = item.item;
                span.className = 'menu-items'
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

    handleOptionClick(optionId) {
        if (optionId !== "newFolder") return;

        this.dropdownConfig.style.display = "none";
        // console.log("Before Render Folder");
        this.folderRenderer.renderNewFolder();
    }
}

const toolbarController = new ToolbarController();
toolbarController.renderDropdown();
toolbarController.openFolderMenu(document.querySelector("#contentGrid"));
export default toolbarController;