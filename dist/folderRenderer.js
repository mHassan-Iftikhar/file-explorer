import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { UIComponents } from "./uiComponents.js";
import { Labels, Selectors } from "./constants.js";
export class FolderRenderer extends UIComponents {
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
        div.id = String(item.id);
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
        if (!this.container)
            return;
        this.clear();
        const items = this.#fileSystemManager.getCurrentChildren();
        items.forEach((item) => {
            this.renderItem(item);
        });
    }
    renderNewFolder() {
        if (!this.container)
            return;
        const activeInput = this.container.querySelector(Selectors.FOLDER_RENAME_INPUT);
        if (activeInput) {
            activeInput.focus();
            activeInput.select();
            return;
        }
        const folderItem = this.createElement("div", "folder-item");
        const defaultName = Labels.NEW_FOLDER;
        folderItem.innerHTML = `
            <div class="folder-item__icon">📁</div>
            <input
                class="folder-item__rename-input"
                value="${defaultName}"
                placeholder="${defaultName}"
            >
        `;
        this.container.appendChild(folderItem);
        const input = folderItem.querySelector(Selectors.FOLDER_RENAME_INPUT);
        if (!input)
            return;
        input.focus();
        input.select();
        let isSaved = false;
        const saveAndCleanUp = () => {
            if (isSaved)
                return;
            isSaved = true;
            const inputName = input.value.trim();
            const createdFolder = this.#fileSystemManager.createFolder(Date.now(), inputName);
            if (!createdFolder)
                return;
            this.render();
        };
        function cancelAndCleanUp() {
            if (isSaved)
                return;
            isSaved = true;
            folderItem.remove();
        }
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveAndCleanUp();
            }
            else if (e.key === "Escape") {
                e.preventDefault();
                cancelAndCleanUp();
            }
        });
        input.addEventListener("blur", () => {
            saveAndCleanUp();
        });
    }
    renameItem(itemId) {
        const item = this.container?.querySelector(`#${itemId}`);
        return item ?? null;
    }
    setViewMode(mode) {
        if (!this.container)
            return;
        if (mode === "list") {
            this.container.style.gridTemplateColumns = "1fr";
        }
        else {
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
            this.render();
        }
        else {
            const filtered = this.#fileSystemManager.getCurrentChildren().filter((item) => {
                if (mode === 'files')
                    return item.type === 'file' || item.type === 'document';
                if (mode === 'folders')
                    return item.type === 'folder';
                return true;
            });
            this.clear();
            filtered.forEach(item => this.renderItem(item));
        }
    }
    applySort(items) {
        if (this.#sortDirection === "asc") {
            items.sort((a, b) => a.name.localeCompare(b.name));
        }
        else {
            items.sort((a, b) => b.name.localeCompare(a.name));
        }
        return items;
    }
    applyFilter(items) {
        switch (this.#fileMode) {
            case 'files':
                return items.filter(item => item.type === "file");
            case 'folders':
                return items.filter(item => item.type === "folder");
            default:
                return items;
        }
    }
}
//# sourceMappingURL=folderRenderer.js.map