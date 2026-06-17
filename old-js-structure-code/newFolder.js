import { createNewFolder, contextWindow } from "./functions.js";

export default createNewFolder;

const contentGrid = document.querySelector("#contentGrid");

contentGrid.addEventListener("dblclick", (e) => {
  const folderItem = e.target.closest(".folder-item");
  if (!folderItem) return;

  folderItem.dataset.folderId;

  contextWindow();

  
});