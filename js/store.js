let folders = JSON.parse(localStorage.getItem("folders"));
let currentParentId = null;
let history = [null];
let historyIndex = 0;

const contentArea = document.querySelector('#content-area');

function saveFolders() {
    localStorage.setItem("folders", JSON.stringify(folders));
}

function getCurrenParentId() {
    return currentParentId;
}

function getChildren(parentId = null) {
    return folders.filter(f => f.parentId === parentId);
}

function getById(id) {
    return folders.find(f => f.id === id) || null;
}

function goBack() {
    
}

function contextWindow() {
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.background = 'red';
    div.style.position = 'absolute';
    div.style.top = '0%';
    div.style.right = '0%';
    div.style.padding = '10px';
    contentArea.appendChild(div);
}

export {saveFolders, getChildren, getCurrenParentId, getById, contextWindow};