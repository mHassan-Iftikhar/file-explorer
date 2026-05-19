import { removeFolder } from "./functions.js";

const contentGrid = document.getElementById("contentGrid");

contentGrid.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const folderItem = e.target.closest(".folder-item");
  if (!folderItem) return;

  const contextMenu = folderItem.querySelector(".context-menu");
  if (!contextMenu) return;

  document.querySelectorAll(".context-menu").forEach((menu) => {
    menu.style.display = "none";
  });

  contextMenu.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".context-menu") && !e.target.closest(".folder-item")) {
    document.querySelectorAll(".context-menu").forEach((menu) => {
      menu.style.display = "none";
    });
  }
});

contentGrid.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-item");
  if (!deleteBtn) return;

  e.stopPropagation();

  const folderItem = deleteBtn.closest(".folder-item");
  if (!folderItem) return;

  const folderId = folderItem.dataset.folderId;
  console.log("Delete option triggered for folder ID:", folderId);

  folderItem.remove();
  removeFolder(parseInt(folderId, 10));
});