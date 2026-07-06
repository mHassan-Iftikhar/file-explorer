import { folderRenderer, ui } from "./uiComponents.js";
import app from "./appState.js"

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
        // console.log("Dropdown items rendered.");
        this.#dropdownConfig.style.display = "block";
    }

    openFolderMenu() {
        const contextMenu = document.createElement("div");
        contextMenu.id = "context-menu";
        document.body.appendChild(contextMenu);
        
        const items = document.querySelector("#contentGrid").addEventListener('contextmenu', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            contextMenu.innerHTML = "";
            contextMenu.style.top = `${e.pageY}px`;
            contextMenu.style.left = `${e.pageX}px`;
            contextMenu.style.display = "block";
            // console.log(e.target);
            this.folderMenuItems.forEach((item) => {
                const singleItem = document.createElement("span");
                singleItem.className = "menu-item";
                singleItem.textContent = item.item;
                
                

                // singleItem.addEventListener('click', () => {
                //     console.log("clicked");
                //     if (item.item === "Rename") {
                //         console.log("Rename clicked!");
                        
                //     } else if (item.item === "Delete") {
                //         console.log("Delete clicked!");
                        
                //     }
                //     contextMenu.style.display = "none";
                // });
            });
            return;
            console.log("items", items);
        });
        console.log("ok:",contextMenu);
        console.log("ok2:",items);
        console.log("context",contextMenu.append(items));
        console.log(contextMenu);
    }

    handleOptionClick(optionId) {
            if(optionId !== "newFolder") return;

        this.dropdownConfig.style.display = "none";
        // console.log("Before Render Folder");
        this.folderRenderer.renderNewFolder();
    }
}

const toolbarController = new ToolbarController();
toolbarController.renderDropdown();
toolbarController.openFolderMenu();
export default toolbarController;