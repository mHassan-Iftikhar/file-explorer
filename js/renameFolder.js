const contentGrid = document.querySelector(".content-grid");
let folders = JSON.parse(localStorage.getItem("folders")) || [];

function toastMessage(msg, type) {
  const div = document.createElement("div");
  div.textContent = msg;
  div.style.width = "fit-content";
  div.style.height = "auto";
  div.style.padding = "10px 16px";
  div.style.position = "fixed";
  div.style.top = "10px";
  div.style.right = "10px";
  div.style.background   = type === "success" ? "#0078d4" : "#e8e8e8";
  div.style.borderRadius = "10px";
  div.style.border = "none";
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}

contentGrid.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const renameBtn = e.target.closest(".rename-item");
  if (!renameBtn) return;

  const folderItem = e.target.closest(".folder-item");
  if (!folderItem) return;

  const input = folderItem.querySelector(".folder-item__name");
  input.contentEditable = true;

  input.classList.add("rename-mode");
  input.focus();

  const range = document.createRange();
  range.selectNodeContents(input);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      let newName = input.textContent.trim();
      folders.map((e) => {
        if (e.name === newName) {
          toastMessage("This name is already exist!", "failed");
          input.style.backgroundColor = "red";
          return;
        }
      });

      const folderId = folderItem.dataset.folderId;
      const folder = folders.find((f) => f.id == folderId);

      if (folder) {
        folder.name = newName;
      }

      localStorage.setItem("folders", JSON.stringify(folders));
      input.contentEditable = false;
      input.classList.remove("rename-mode");
    }
  };
});
