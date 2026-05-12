const contentGrid = document.querySelector('.content-grid');

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

    const folderDiv = document.createElement('div');
    folderDiv.className = "folder-item";
    folderDiv.dataset.folderId = folder.id;

    folderDiv.innerHTML = `
        <div class="folder-item__icon">📁</div>
        <div class="folder-item__name">${folderName}</div>
        <div class="context-menu">
            <div class="menu-item rename-item">Rename</div>
            <div class="menu-item delete-item">Delete</div>
        </div>
    `;

    contentGrid.appendChild(folderDiv);
}

export default createNewFolder;