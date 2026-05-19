import * as store from "./store.js";

export default function getFolder() {
  return store.folders
}

export function saveFolders() {
  console.log("save before");
  localStorage.setItem("folders", JSON.stringify(store.folders));
  console.log("save after");
}

export function findFolder(folder, id) {
  if (Array.isArray(folder)) {
    for (let f of folder) {
      const found = findFolder(f, id);
      if (found) return found;
    }
    return null;
  }
  if (!folder) return null;
  if(folder.id === id) {
    return folder;
  }

  if (folder.children) {
    for(let child of folder.children) {
      const found = findFolder(child, id);

      if(found) {
        return found;
      }
    }
  }

  return null;
}

export function addFolder(parentId, folderName) {
  const data = store.folders;

  const parentFolder = findFolder(data, parentId);

  if(!parentFolder) {
    console.log("Folder nor found");
    return;
  }

  parentFolder.children.push(createFolder(folderName));

  saveFolders(data);
}

export function getCurrenParentId() {
  return store.currentParentId;
}

export function getChildren(parentId = null) {
  return store.folders.filter((f) => f.parentId === parentId);
}

export function getById(id) {
  return store.folders.find((f) => f.id === id) || null;
}

export function getFolders() {
  return store.folders;
}

export function removeFolder(id) {
  const updated = store.folders.filter((f) => f.id !== id);
  store.folders.length = 0;
  updated.forEach((f) => store.folders.push(f));
  saveFolders();
}

export function getCurrentPath() {
  const path = [];
  let id = store.currentParentId;
  while (id != null) {
    const folder = getById(id);
    if (!folder) break;
    path.unshift(folder);
    id = folder.parentId;
  }
  return path;
}

export function contextWindow() {
  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.background = "red";
  div.style.position = "absolute";
  div.style.top = "0%";
  div.style.right = "0%";
  div.style.padding = "10px";
  store.contentArea.appendChild(div);
}

export function toastMessage(msg, type) {
  const div = document.createElement("div");
  div.textContent = msg;
  div.style.width = "fit-content";
  div.style.height = "auto";
  div.style.padding = "10px 16px";
  div.style.position = "fixed";
  div.style.top = "10px";
  div.style.right = "10px";
  div.style.background = type === "success" ? "#0078d4" : "#e8e8e8";
  div.style.borderRadius = "10px";
  div.style.border = "none";
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
    location.reload();
  }, 2000);
}

export function foldi(folder) {
  const contentGrid = document.getElementById("contentGrid");
  const folderDiv = document.createElement("div");
  folderDiv.className = "folder-item";
  folderDiv.dataset.folderId = folder.id;

  folderDiv.innerHTML = `
    <div class="folder-item__icon">📁</div>
    <div class="folder-item__name">${folder.name}</div>
    <div class="context-menu">
      <div class="menu-item rename-item">Rename</div>
      <div class="menu-item delete-item">Delete</div>
    </div>
  `;

  contentGrid.appendChild(folderDiv);
}

export function createNewFolder() {
  let folderName = "New folder";
  const folders = getFolders();
  // const folderItem = e.target.closest(".folder-item");

  const baseName = folderName;
  let counter = 1;

  while (folders.some((f) => f.name === folderName)) {
    folderName = `${baseName} (${counter})`;
    counter++;
  }

  const folder = {
    id: Date.now(),
    name: folderName,
    // createdAt,
    children: [],
  };

  const childFolder = {
    parentId: folder.id,
    id: Date.now(),
    name: folderName,
    children: []
  }

  folders.push(folder);
  saveFolders();

  foldi(folder);
}
