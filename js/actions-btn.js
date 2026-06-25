const minimizeBtn = document.querySelector("#minimize-btn");
const maximizeBtn = document.querySelector("#maximize-btn");
const close = document.querySelector("#close-btn");
const fileExplorer = document.querySelector('#file-explorer');
const titleBar = document.querySelector("#title-bar");

const windowState = {
    isMaximized: false,
    isDragging: false,
    offsetX: 0,
    offsetY: 0,
    dragLeft: 0,
    dragTop: 0,
};

function setExplorerPosition(left, top) {
    fileExplorer.style.left = `${left}px`;
    fileExplorer.style.top = `${top}px`;
}

function setMaximizedState(isMaximized) {
    windowState.isMaximized = isMaximized;
    fileExplorer.classList.toggle("file-explorer--maximized", isMaximized);

    if (isMaximized) {
        fileExplorer.style.position = "fixed";
        fileExplorer.style.width = "60vw";
        fileExplorer.style.height = "60vh";
        fileExplorer.style.left = `${windowState.dragLeft}px`;
        fileExplorer.style.top = `${windowState.dragTop}px`;
    } else {
        fileExplorer.style.position = "relative";
        fileExplorer.style.width = "100%";
        fileExplorer.style.height = "100%";
        fileExplorer.style.left = "";
        fileExplorer.style.top = "";
        fileExplorer.style.transform = "";
    }
}

minimizeBtn.addEventListener('click', (e) => {
    fileExplorer.style.display = 'none';
});

maximizeBtn.addEventListener('click', (e) => {
    setMaximizedState(!windowState.isMaximized);
});

if (titleBar) {
    titleBar.addEventListener("pointerdown", (event) => {
        if (!windowState.isMaximized) return;

        windowState.isDragging = true;
        const rect = fileExplorer.getBoundingClientRect();
        windowState.offsetX = event.clientX - rect.left;
        windowState.offsetY = event.clientY - rect.top;
    });
}

document.addEventListener("pointermove", (event) => {
    if (!windowState.isDragging || !windowState.isMaximized) return;

    const nextLeft = Math.max(0, event.clientX - windowState.offsetX);
    const nextTop = Math.max(0, event.clientY - windowState.offsetY);
    windowState.dragLeft = nextLeft;
    windowState.dragTop = nextTop;
    setExplorerPosition(nextLeft, nextTop);
});

document.addEventListener("pointerup", () => {
    windowState.isDragging = false;
});

document.addEventListener("pointercancel", () => {
    windowState.isDragging = false;
});