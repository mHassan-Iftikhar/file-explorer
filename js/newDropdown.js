import newFolder from "./newFolder.js";

const createNewItems = document.querySelector('.create-new-items');
const newDropdown = document.querySelector('.new-dropdown');

const newFF = [
    { icon: '📁', name: 'Folder', idname: 'new-folder', classname: 'new-select' },
    { icon: '🔗', name: 'Shortcut', idname: 'shortcut', classname: 'new-select' },
    { icon: '📁', name: 'Microsoft Access Database', idname: 'ms-access-db', classname: 'new-select' },
];

const div = document.createElement('div');
div.classList.add('new-dropdown-items');

newFF.forEach(({ icon, name, classname, idname }) => {
    const folder = document.createElement('div');
    folder.className = classname;
    folder.innerHTML = `
        <span>${icon}</span>
        <span>${name}</span>
    `;

    folder.addEventListener('click', () => {
        if (idname === 'new-folder') {
            newFolder();
        }
        const hideDropdown = createNewItems.querySelector(newDropdown);
        if(hideDropdown) newDropdown.style.display = 'none';
    });

    div.appendChild(folder);
});

newDropdown.appendChild(div);

createNewItems.addEventListener('click', (e) => {
    e.stopPropagation();
    newDropdown.style.display = newDropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    if (
        createNewItems.contains(e.target) ||
        newDropdown.contains(e.target)
    ) return;

    newDropdown.style.display = 'none';
});