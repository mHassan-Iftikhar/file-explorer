import { saveFolders } from "./nestedFolder";

const contentGrid = document.getElementById("contentGrid");

contentGrid.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const folderItem = e.target.closest('.folder-item');
    if (!folderItem) return;

    const contextMenu = folderItem.querySelector('.context-menu');
    if (!contextMenu) return;

    contextMenu.style.display = "block";
    console.log("Right-click detected on folder!");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest('.context-menu') && !e.target.closest('.folder-item')) {
        const contextMenus = document.querySelectorAll(".context-menu");
        contextMenus.forEach(menu => {
            menu.style.display = "none";
        });
    }
});

contentGrid.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest('.delete-item');
    if (!deleteBtn) return;

    e.stopPropagation();
    const folderItem = deleteBtn.closest('.folder-item');
    if (!folderItem) return;

    const folderId = folderItem.dataset.folderId;
    console.log("Delete option triggered for folder ID:", folderId);

    folderItem.remove();

    let folders = JSON.parse(localStorage.getItem("folders")) || [];
    folders = folders.filter(f => f.id !== parseInt(folderId));
    saveFolders();

    console.log("Folder deleted successfully");
});