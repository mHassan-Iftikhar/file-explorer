import { store } from "./store.js";

const getStoredFolders = () => store.getData();

class Folder {
  constructor(id, name, children = []) {
    this.id = id;
    this.name = name;
    this.children = children;
  }
}

class FolderManager {
  createFolder(name = "New Folder") {
    const folders = getStoredFolders();
    const id = Date.now();
    const newFolder = new Folder(id, name);
    folders.push(newFolder);
    store.saveData(folders);
    return newFolder;
  }

  renameFolder(id, newName) {
    const folders = getStoredFolders();
    const folder = folders.find(f => f.id === id);
    if (folder) {
      folder.name = newName;
      store.saveData(folders);
      return folder;
    }
    return null;
  }

  deleteFolder(id) {
    const folders = getStoredFolders();
    const updated = folders.filter(f => f.id !== Number(id));
    store.saveData(updated);
    return updated;
  }

  getAll() {
    return getStoredFolders();
  }
}

const folderManager = new FolderManager();

export { Folder, folderManager };

