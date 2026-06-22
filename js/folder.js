import { store } from "./store.js";

let currentFolderId = null;

const getStoredFolders = () => store.getData();

class Folder {
  constructor(id, name, children = []) {
    this.id = id;
    this.name = name;
    this.children = children;
  }
}

class FolderManager {
  openFolder(id) {
    currentFolderId = id;
  }

  goBack() {
    if (currentFolderId == null) return;

    const folders = getStoredFolders();
    const parent = this.findParent(currentFolderId, folders);
    currentFolderId = parent ? parent.id : null;
  }

  getCurrentChildren() {
    const folders = getStoredFolders();
    if (currentFolderId == null) return folders;

    const parent = this.findFolder(currentFolderId, folders);
    return parent ? parent.children : [];
  }

  createFolder(name = "New Folder") {
    const folders = getStoredFolders();
    const id = Date.now();
    const newFolder = new Folder(id, name);

    if (currentFolderId == null) {
      folders.push(newFolder);
    } else {
      const parent = this.findFolder(currentFolderId, folders);
      if (!parent) return null;
      parent.children.push(newFolder);
    }

    store.saveData(folders);
    return newFolder;
  }

  renameFolder(id, newName) {
    const folders = getStoredFolders();
    const folder = this.findFolder(id, folders);

    if (folder) {
      folder.name = newName;
      store.saveData(folders);
      return folder;
    }

    return null;
  }

  deleteFolder(id) {
    const folders = getStoredFolders();
    const deleted = this.removeFolder(id, folders);

    if (deleted) {
      if (Number(id) === currentFolderId) {
        this.goBack();
      }
      store.saveData(folders);
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
      if (folder.children?.length && this.removeFolder(id, folder.children)) {
        return true;
      }
    }

    return false;
  }

  getAll() {
    return getStoredFolders();
  }

  findFolder(id, folders) {
    const targetId = Number(id);

    for (const folder of folders) {
      if (folder.id === targetId) return folder;

      if (folder.children?.length) {
        const result = this.findFolder(targetId, folder.children);
        if (result) return result;
      }
    }

    return null;
  }

  findParent(targetId, folders) {
    const id = Number(targetId);

    for (const folder of folders) {
      if (folder.children?.some((child) => child.id === id)) {
        return folder;
      }

      if (folder.children?.length) {
        const found = this.findParent(id, folder.children);
        if (found) return found;
      }
    }

    return null;
  }
}

const folderManager = new FolderManager();

export { Folder, folderManager };
