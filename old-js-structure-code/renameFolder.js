import { getFolders, saveFolders, toastMessage } from "./functions.js";

const contentGrid = document.getElementById("contentGrid");

contentGrid.addEventListener("click", (e) => {
  const renameBtn = e.target.closest(".rename-item");
  if (!renameBtn) return;

  e.stopPropagation();

  const folderItem = renameBtn.closest(".folder-item");
  if (!folderItem) return;

  const folders = getFolders();

  const contextMenu = folderItem.querySelector(".context-menu");
  if (contextMenu) contextMenu.style.display = "none";

  const input = folderItem.querySelector(".folder-item__name");
  input.contentEditable = true;
  input.classList.add("rename-mode");
  input.focus();

  const range = document.createRange();
  range.selectNodeContents(input);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      const newName = input.textContent.trim();
      const isDuplicate = folders.some((f) => f.name === newName);

      if (isDuplicate) {
        toastMessage("This name already exists!", "failed");
        input.style.backgroundColor = "red";
        return;
      }

      const folderId = folderItem.dataset.folderId;
      const folder = folders.find((f) => f.id == folderId);

      if (folder) {
        folder.name = newName;
      }

      saveFolders();
      input.contentEditable = false;
      input.classList.remove("rename-mode");
    }
  };
});