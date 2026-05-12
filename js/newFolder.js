const contentGrid = document.querySelector('.content-grid');
import {foldi} from './loadFolders.js';

function createNewFolder() {
    let folderName = "New folder";
    let folders = JSON.parse(localStorage.getItem("folders")) || [];

    let baseName = folderName;
    let counter = 1;

    while (folders.some(f => f.name === folderName)) {
        folderName = `${baseName} (${counter})`;
        counter++;
    }

    const folder = {
        id: Date.now(),
        name: folderName,
    };

    folders.push(folder);
    localStorage.setItem("folders", JSON.stringify(folders));

    foldi(folder);
}

export default createNewFolder;