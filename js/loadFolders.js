function loadFolders() {
    const folders = JSON.parse(localStorage.getItem("folders")) || [];

    const contentGrid = document.getElementById("contentGrid");
    contentGrid.innerHTML = "";

    folders.forEach(folder => {
        foldi(folder);
    });
}

export function foldi(folder) {
    const folderDiv = document.createElement("div");
        folderDiv.className = "folder-item";
        folderDiv.dataset.folderId = folder.id;

        folderDiv.innerHTML = `
            <div class="folder-item__icon">📁</div>
            <div class="folder-item__name">${folder.name}</div>
            <div class="context-menu">
                <div class="menu-item rename-item">Rename</div>
                <div class="menu-item delete-item">Delete</div>
            </div>
        `;

        contentGrid.appendChild(folderDiv);
}

window.addEventListener("DOMContentLoaded", loadFolders);