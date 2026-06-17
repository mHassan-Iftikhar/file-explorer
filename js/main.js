import ui from "./ui.js";
const newFolder = document.querySelector('.new-folder');

if (newFolder) {
    newFolder.addEventListener('click', (e) => {
        e.preventDefault();
        ui.renderFolder();
    });
}

ui.renderAll();

