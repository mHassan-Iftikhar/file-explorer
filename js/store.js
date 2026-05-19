let folders = JSON.parse(localStorage.getItem("folders")) || [];
let currentParentId = null;
let history = [null];
let historyIndex = 0;

const contentArea = document.querySelector("#content-area");

const newFF = [
  { icon: "📁", name: "Folder",                     idname: "new-folder",  classname: "new-select" },
  { icon: "🔗", name: "Shortcut",                   idname: "shortcut",    classname: "new-select" },
  { icon: "📁", name: "Microsoft Access Database",  idname: "ms-access-db",classname: "new-select" },
];

export {
  folders,
  currentParentId,
  history,
  historyIndex,
  contentArea,
  newFF,
}; 