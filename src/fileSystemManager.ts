import store from "./storageBase.js";
import { Labels } from "./constants.js";
import type { FolderItem } from "./types.js";

class FileSystemManagerService {
    storage = store;
    currentFolderId: number | null = null;

    #loadFolders(): FolderItem[] {
        return (this.storage.getData("folders") as FolderItem[] | null) ?? [];
    }

    #saveFolders(items: FolderItem[]) {
        this.storage.saveData('folders', items);
    }

    getCurrentChildren(): FolderItem[] {
        const allItems = this.#loadFolders();

        if (this.currentFolderId == null) {
            return allItems;
        }

        const currentFolder = this.findFolder(this.currentFolderId, allItems);
        return currentFolder?.subFolders ?? [];
    }

    doesNameExist(name: string, excludeId: number | string | null = null): boolean {
        const items = this.getCurrentChildren();

        return items.some((item) => {
            return item.id !== Number(excludeId) && item.name.toLowerCase() === String(name).toLowerCase();
        });
    }

    getUniqueName(base: string = Labels.NEW_FOLDER): string {
        const items = this.getCurrentChildren();
        let name = base;
        let index = 0;

        while (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
            index += 1;
            name = `${base} (${index})`;
        }

        return name;
    }

    openFolder(id: number | string | null) {
        this.currentFolderId = id ? Number(id) : null;
    }

    goBack() {
        if (this.currentFolderId === null) return;

        const allItems = this.#loadFolders();
        const currentFolder = this.findFolder(this.currentFolderId, allItems);

        this.currentFolderId = currentFolder ? currentFolder.parentId : null;
    }

    createFolder(
        id: number = Date.now(),
        name: string = Labels.NEW_FOLDER,
        parentId: number | null = this.currentFolderId
    ): FolderItem | null {
        const folders = this.#loadFolders();
        const folderId = Number(id);
        const normalizedName = String(name ?? "").trim() || Labels.NEW_FOLDER;
        const uniqueName = this.doesNameExist(normalizedName) ? this.getUniqueName(normalizedName) : normalizedName;
        const newFolder: FolderItem = {
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

    renameFolder(id: number, newName: string): FolderItem | null {
        const folders = this.#loadFolders();
        const folderId = Number(id);
        const folder = this.findFolder(folderId, folders);

        if (folder && folder.id === id) {
            folder.name = newName;
            this.#saveFolders(folders);
            return folder;
        }

        return null;
    }

    deleteFolder(id: number | string) {
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

    removeFolder(id: number | string, folders: FolderItem[]): boolean {
        const targetId = Number(id);
        const index = folders.findIndex((f) => f.id === targetId);

        if (index !== -1) {
            folders.splice(index, 1);
            return true;
        }

        for (const folder of folders) {
            if (folder.subFolders.length && this.removeFolder(targetId, folder.subFolders)) {
                return true;
            }
        }

        return false;
    }

    findFolder(id: number | string, folders: FolderItem[]): FolderItem | null {
        const targetId = Number(id);
        for (const folder of folders) {
            if (folder.id === targetId) return folder;

            if (folder.subFolders.length) {
                const result = this.findFolder(targetId, folder.subFolders);
                if (result) return result;
            }
        }

        return null;
    }

    findParent(id: number | string, folders: FolderItem[]): FolderItem | null {
        const numId = Number(id);

        for (const folder of folders) {
            if (folder.subFolders?.some((child) => child.id === numId)) {
                return folder;
            }

            if (folder.subFolders?.length) {
                const found = this.findParent(numId, folder.subFolders);
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

export const FileSystemManager = new FileSystemManagerService();
export default FileSystemManager;