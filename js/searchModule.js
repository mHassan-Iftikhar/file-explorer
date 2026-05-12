const input = document.querySelector('#command-bar-search');
const contentGrid = document.querySelector('#contentGrid');
import {foldi} from './loadFolders.js';

input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    const folders = JSON.parse(localStorage.getItem("folders"));

    const matchedFolders = folders.filter((folder) => {
        return folder.name.toLowerCase().includes(value);
    });

    contentGrid.innerHTML = ``;
    
    if (matchedFolders.length === 0) {
        contentGrid.innerHTML = '<p class="no-file-found">No files found</p>';
        return;
    }

    matchedFolders.forEach(folder => {
        foldi(folder);
    });

    console.log("Found Folders", matchedFolders);
})