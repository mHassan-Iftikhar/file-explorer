import fileManager  from "./fileSystemManager.js";

class UIComponents {
    #container = document.querySelector("#contentGrid");
    #fileManager = fileManager;

    constructor(container = this.#container, fileManager = this.#fileManager) {
        this.#container = container;
        this.fileManager = fileManager;
    }

    // container(containerSelecter) {
    //     this.#container = document.querySelector(containerSelecter);

    //     if (!this.#container) {
    //         console.error(`Container element not found for selector: ${containerSelecter}`);
    //     }
    // }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }

    clear() {
        if (this.#container) {
            this.#container.innerHTML = '';
        }
    }

    get container() {
        return this.#container;
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }
}

class FolderRenderer extends UIComponents {
    
    #fileSystemManager = fileManager;
    #viewMode = 'grid';
    #sortDirection = 'asc';
    #fileMode = 'all';

    constructor(containerSelecter, fileSystemManager) {
        super(containerSelecter);
        this.#fileSystemManager = fileSystemManager ?? this.#fileSystemManager;
    }

    renderItem(item) {
        const div = this.createElement("div", "folder-item");
        div.id = item.id;
        const icon = this.createElement("div", "folder-item__icon");
        icon.textContent = item.type === "file" ? "📄" : "📁";
        const name = this.createElement("div", "folder-item__name");
        name.textContent = item.name;
        name.style.backgroundColor = 'transparent';
        name.style.color = 'white';
        name.style.border = 'none';
        div.append(icon, name);
        this.container?.append(div);
    }

    render() {
        if (!this.container) return;

        this.clear();

        let items = this.#fileSystemManager.getCurrentChildren();
        items.forEach((item) => {
            this.renderItem(item);
        });
    }

    renderNewFolder() {
        if (!this.container) return;

        const activeInput = this.container.querySelector(".folder-item__rename-input");
        if (activeInput) {
            activeInput.focus();
            activeInput.select();
            return;
        }

        const folderItem = this.createElement("div", "folder-item");
        const defaultName = "New Folder";

        folderItem.innerHTML = `
            <div class="folder-item__icon">📁</div>
            <input
                class="folder-item__rename-input"
                value="${defaultName}"
                placeholder="${defaultName}"
            >
        `;

        this.container.appendChild(folderItem);

        const input = folderItem.querySelector(".folder-item__rename-input");
        input.focus();
        input.select();

        let isSaved = false;

        const saveAndCleanUp = () => {
            if (isSaved) return;
            isSaved = true;

            const inputName = input.value.trim();
            const createdFolder = this.#fileSystemManager.createFolder(Date.now(), inputName);
            if (!createdFolder) return;

            this.render();
        };

        function cancelAndCleanUp() {
            if (isSaved) return;
            isSaved = true;
            folderItem.remove();
        };

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveAndCleanUp();
            } else if (e.key === "Escape") {
                e.preventDefault();
                cancelAndCleanUp();
            }
        });

        input.addEventListener("blur", () => {
            saveAndCleanUp();
        });
    }

    renameItem(itemId) {
        const item = this.container.querySelector(`#${itemId}`);
        return item;
    }

    setViewMode(mode) {
        if (mode === "list") {
            this.container.style.gridTemplateColumns = "1fr";
        } else {
            this.container.style.gridTemplateColumns = "repeat(auto-fit, minmax(100px, 1fr))";
        }
    }

    setSortDirection(dir) {
        if (dir === "asc") {
            this.#sortDirection = "asc";
            return;
        }

        this.#sortDirection = "desc";
    }

    setFilterMode(mode) {
        if (mode === 'all') {
            this.render()
        } else {
            this.render(this.#fileSystemManager.getCurrentChildren().filter(item => item.constructor.name === mode))
        }
    }

    applySort(items) {
        if (this.#sortDirection === "asc") {
            items.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            items.sort((a, b) => b.name.localeCompare(a.name));
        }

        return items;
    }

    applFilter(items) {
        switch (this.#fileMode) {
            case 'files':
                return items.filter(item => item instanceof File);
            case 'folders':
                return items.filter(item => item instanceof Folder);
            default:
                return items;
        }
    }
}

const folderRenderer = new FolderRenderer();
const ui = new UIComponents();

export { UIComponents as UI, FolderRenderer, folderRenderer, ui };