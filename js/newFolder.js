import { foldi } from './loadFolders.js';
import { saveFolders } from './store.js';

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
        parentId: null,
        history: [null]
    };

    folders.push(folder);
    saveFolders();

    foldi(folder);
}

export default createNewFolder;