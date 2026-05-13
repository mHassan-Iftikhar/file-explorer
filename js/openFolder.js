import { contextWindow } from "./store.js";
const contextMenu = document.querySelector('.context-menu');

const contentGrid = document.querySelector('#contentGrid');

contentGrid.addEventListener('dblclick', (e) => {
    const folderItem = e.target.closest('.folder-item');
    if (!folderItem) return;

    const folderId = folderItem.dataset.folderId;
    console.log('Opening folder:', folderId);
    
    contextWindow();
});