import { foldi } from "./functions.js";

function loadFolders() {
  const folders = JSON.parse(localStorage.getItem("folders")) || [];
  const contentGrid = document.getElementById("contentGrid");
  contentGrid.innerHTML = "";
  folders.forEach((folder) => foldi(folder));
}

window.addEventListener("DOMContentLoaded", loadFolders);