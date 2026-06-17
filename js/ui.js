import { folderManager } from "./folder.js";
import duplication from "./utils.js";

const contentGrid = document.querySelector("#contentGrid");

class UI {
  renderFolderItem(folder) {
    const folderItem = document.createElement("div");
    folderItem.className = "folder-item";
    folderItem.dataset.id = folder.id;

    folderItem.innerHTML = `
        <div class="folder-item__icon">📁</div>
        <span class="folder-item__name">${folder.name}</span>
    `;

    contentGrid.appendChild(folderItem);

    folderItem.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      this.showContextMenu(e.clientX, e.clientY, folder.id);
    });
  }

  renderFolder() {
    this.renderNewFolder();
  }

  renderNewFolder() {
    if (!contentGrid) return;

    const activeInput = contentGrid.querySelector(".folder-item__rename-input");
    if (activeInput) {
      activeInput.focus();
      activeInput.select();
      return;
    }

    const folderItem = document.createElement("div");
    folderItem.className = "folder-item";
    const defaultName = "New Folder";

    folderItem.innerHTML = `
        <div class="folder-item__icon">📁</div>
        <input
            class="folder-item__rename-input"
            value="${defaultName}"
            placeholder="${defaultName}"
        >
    `;

    contentGrid.appendChild(folderItem);

    const input = folderItem.querySelector(".folder-item__rename-input");
    input.focus();
    input.select();

    let isSaved = false;

    const saveAndCleanUp = () => {
      if (isSaved) return;
      isSaved = true;

      let name = input.value.trim();

      if (name === "" || name === defaultName) {
        name = duplication.getUniqueName(defaultName);
      } else {
        if (duplication.doesNameExist(name)) {
          name = duplication.getUniqueName(name);
        }
      }

      folderManager.createFolder(name);

      this.renderAll();
    };

    const cancelAndCleanUp = () => {
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

  renameFolderUI(folderId) {
    const folderItem = contentGrid.querySelector(`.folder-item[data-id="${folderId}"]`);
    if (!folderItem) return;

    const nameSpan = folderItem.querySelector(".folder-item__name");
    if (!nameSpan) return;

    const currentName = nameSpan.textContent;

    if (folderItem.querySelector(".folder-item__rename-input")) return;

    const input = document.createElement("input");
    input.className = "folder-item__rename-input";
    input.value = currentName;

    nameSpan.replaceWith(input);
    input.focus();
    input.select();

    let isSaved = false;

    const saveRename = () => {
      if (isSaved) return;
      isSaved = true;

      let newName = input.value.trim();
      if (newName === "") {
        newName = currentName;
      } else if (newName !== currentName) {
        if (duplication.doesNameExist(newName)) {
          newName = duplication.getUniqueName(newName);
        }
      }

      folderManager.renameFolder(folderId, newName);
      this.renderAll();
    };

    const cancelRename = () => {
      if (isSaved) return;
      isSaved = true;
      input.replaceWith(nameSpan);
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveRename();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelRename();
      }
    });
  }

  renderAll() {
    if (!contentGrid) return;
    contentGrid.innerHTML = "";
    const folders = folderManager.getAll();
    folders.forEach((folder) => {
      this.renderFolderItem(folder);
    });
  }
}

class DeleteFolder extends UI {
  showContextMenu(x, y, folderId) {
    document.querySelector(".context-menu")?.remove();

    const folderItem = contentGrid.querySelector(`.folder-item[data-id="${folderId}"]`);
    if (!folderItem) return;

    const menu = document.createElement("div");
    menu.className = "context-menu";

    menu.innerHTML = `
        <div class="menu-item rename-btn">Rename</div>
        <div class="menu-item delete-btn">Delete</div>
    `;

    const rect = folderItem.getBoundingClientRect();
    const xAxis = x - rect.left;
    const yAxis = y - rect.top;

    menu.style.position = "absolute";
    menu.style.left = `${xAxis}px`;
    menu.style.top = `${yAxis}px`;
    menu.style.display = "block";

    folderItem.appendChild(menu);

    menu.querySelector(".rename-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      menu.remove();
      this.renameFolderUI(folderId);
    });

    menu.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      menu.remove();
      folderManager.deleteFolder(folderId);
      this.renderAll();
    });

    document.addEventListener("click", () => menu.remove(), { once: true });
  }
}

const ui = new DeleteFolder();
export default ui;
