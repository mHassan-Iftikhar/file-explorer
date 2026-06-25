import { store } from "./store.js";

class Folder {
  constructor(id, name, subFolders = [], type = "folder") {
    this.id = Number(id);
    this.name = name.trim();
    this.subFolders = subFolders;
    this.type = type;
  }
}

class FolderManager {

  #currentFolderId = null;
  
  constructor(currentId = null) {
    this.currentFolderId = currentId;
  }
  
  #getStoredFolders() {
    return store.getData();
  }
  
  openFolder(id) {
    this.currentFolderId = id;
  }

  goBack() {
    if (this.currentFolderId == null) return;

    const folders = this.#getStoredFolders();
    const parent = this.findParent(this.currentFolderId, folders);
    this.currentFolderId = parent ? parent.id : null;
  }

  getCurrentChildren() {
    const folders = this.#getStoredFolders();
    if (this.currentFolderId == null) return folders;

    const parent = this.findFolder(this.currentFolderId, folders);
    return parent ? parent.subFolders : [];
  }

  createFolder(id = Date.now(), name = "New Folder") {
    const folders = this.#getStoredFolders();
    const folderId = Number(id);
    const newFolder = new Folder(folderId, name);

    if (this.currentFolderId == null) {
      folders.push(newFolder);
    } else {
      const parent = this.findFolder(this.currentFolderId, folders);
      if (!parent) return null;
      parent.subFolders.push(newFolder);
    }

    store.saveData(folders);
    return newFolder;
  }

  createFile(id = Date.now(), name = "New Text Document.txt") {
    const folders = this.#getStoredFolders();
    const fileId = Number(id);
    const newFile = new Folder(fileId, name, [], "file");

    if (this.currentFolderId == null) {
      folders.push(newFile);
    } else {
      const parent = this.findFolder(this.currentFolderId, folders);
      if (!parent) return null;
      if (!parent.subFolders) parent.subFolders = [];
      parent.subFolders.push(newFile);
    }

    store.saveData(folders);
    return newFile;
  }

  renameFolder(id, newName) {
    const folders = this.#getStoredFolders();
    const folder = this.findFolder(id, folders);

    if (folder) {
      folder.name = newName;
      store.saveData(folders);
      return folder;
    }

    return null;
  }

  deleteFolder(id) {
    const folders = this.#getStoredFolders();
    const deleted = this.removeFolder(id, folders);

    if (deleted) {
      store.saveData(folders);
      if (Number(id) === this.currentFolderId) {
        this.goBack();
      }
    }

    return folders;
  }

  removeFolder(id, folders) {
    const index = folders.findIndex((f) => f.id === id);

    if (index !== -1) {
      folders.splice(index, 1);
      return true;
    }

    for (const folder of folders) {
      if (folder.subFolders?.length && this.removeFolder(id, folder.subFolders)) {
        return true;
      }
    }

    return false;
  }

  findFolder(id, folders) {

    for (const folder of folders) {
      if (folder.id === id) return folder;

      if (folder.subFolders?.length) {
        const result = this.findFolder(id, folder.subFolders);
        if (result) return result;
      }
    }

    return null;
  }

  findParent(targetId, folders) {
    const id = Number(targetId);

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
}

const folderManager = new FolderManager();

export { Folder, folderManager };
