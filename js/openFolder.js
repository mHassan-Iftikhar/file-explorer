import newFolder from './newFolder';

const contentGrid = document.querySelector('.content-grid');

contentGrid.addEventListener('dblclick', (e) => {
    const folderItem = e.target.closest('.folder-item');
    if (!folderItem) return;

    const folderId = folderItem.dataset.folderId;
    
    activeFolderId = folderId; 
    
    loadFolders(activeFolderId); 
});