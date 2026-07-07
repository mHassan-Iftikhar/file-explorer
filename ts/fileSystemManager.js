import store from "./storageBase.js";

class FileSystemManager {

    constructor() {
        this.storage = store;
        this.currentFolderId = null;
    }

    #loadFolders() {
        return this.storage.getData("folders");
    }

    #saveFolders(items) {
        this.storage.saveData('folders', items);
    }

    getCurrentChildren() {
        const allItems = this.#loadFolders();

        if (this.currentFolderId == null) {
            return allItems;
        }

        const currentFolder = this.findFolder(this.currentFolderId, allItems);
        return currentFolder?.subFolders ?? [];
    }

    doesNameExist(name, excludeId = null) {
        const items = this.getCurrentChildren();

        return items.some((item) => {
            return item.id !== Number(excludeId) && item.name.toLowerCase() === String(name).toLowerCase();
        });
    }

    getUniqueName(base = "New Folder") {
        const items = this.getCurrentChildren();
        let name = base;
        let index = 0;

        while (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
            index += 1;
            name = `${base} (${index})`;
        }

        return name;
    }

    openFolder(id) {
        this.currentFolderId = id ? Number(id) : null;
    }

    goBack() {
        if (this.currentFolderId === null) return;

        const allItems = this.#loadFolders();
        const currentFolder = this.findFolder(this.currentFolderId, allItems);

        this.currentFolderId = currentFolder ? currentFolder.parentId : null;
    }

    createFolder(id = Date.now(), name = "New Folder", parentId = this.currentFolderId) {
        const folders = this.#loadFolders();
        const folderId = Number(id);
        const targetParentId = parentId ? Number(parentId) : null;
        const normalizedName = String(name ?? "").trim() || "New Folder";
        const uniqueName = this.doesNameExist(normalizedName) ? this.getUniqueName(normalizedName) : normalizedName;
        const newFolder = {
            id: folderId,
            name: uniqueName,
            parentId,
            subFolders: [],
            type: "folder"
        };

        if (parentId == null) {
            folders.push(newFolder);
        } else {
            const parent = this.findFolder(parentId, folders);
            if (!parent) return null;
            if (!parent.subFolders) parent.subFolders = [];
            parent.subFolders.push(newFolder);
        }

        this.#saveFolders(folders);
        return newFolder;
    }

    renameFolder(id, newName) {
        const folders = this.#loadFolders();
        const folderId = Number(id);
        const folder = this.findFolder(folderId, folders);

        if (folder.id === id) {
            folder.name = newName;
            this.#saveFolders(folders);
            return folder;
        }

        return null;
    }

    deleteFolder(id) {
        const folders = this.#loadFolders();
        const folderId = Number(id);
        const deleted = this.removeFolder(folderId, folders);

        if (deleted) {
            this.#saveFolders(folders);
            if (Number(id) === this.currentFolderId) {
                this.goBack();
            }
        }

        return folders;
    }

    removeFolder(id, folders) {
        const targetId = Number(id);
        const index = folders.findIndex((f) => f.id === targetId);

        if (index !== -1) {
            folders.splice(index, 1);
            return true;
        }

        for (const folder of folders) {
            if (folder.subFolders?.length && this.removeFolder(targetId, folder.subFolders)) {
                return true;
            }
        }

        return false;
    }

    findFolder(id, folders) {
        const targetId = Number(id);
        for (const folder of folders) {
            if (folder.id === targetId) return folder;

            if (folder.subFolders?.length) {
                const result = this.findFolder(targetId, folder.subFolders);
                if (result) return result;
            }
        }

        return null;
    }

    findParent(id, folders) {
        id = Number(id);

        for (const folder of folders) {
            if (folder.subFolders?.some((child) => child.id === id)) {
                return folder;
            }

            if (folder.subFolders?.length) {
                const found = this.findParent(id, folder.subFolders);
                if (found) return found;
            }
        }

        return null;
    }

    loadFolders() {
        const folders = this.#loadFolders();
        return folders;
    }
}

const fileManager = new FileSystemManager();
export default fileManager;