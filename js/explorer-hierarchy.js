import { folderManager } from "./folder.js";

class ExplorerHierarchy {
  constructor() {
    this.hierarchy = document.querySelector(".command-bar-center");
    this.currentPath = [];
  }

  notifyNavigation() {
    window.dispatchEvent(new Event("explorer:navigate"));
  }

  renderHierarchy() {
    if (!this.hierarchy) return;

    this.hierarchy.innerHTML = "";

    const homeIcon = document.createElement("span");
    homeIcon.className = "material-icons";
    homeIcon.textContent = "home";
    this.hierarchy.appendChild(homeIcon);

    const homeBtn = document.createElement("span");
    homeBtn.className = "breadcrumb-item";
    homeBtn.textContent = "Home";
    homeBtn.addEventListener("click", () => this.navigateToHome());
    this.hierarchy.appendChild(homeBtn);

    this.currentPath.forEach((folder, index) => {
      const arrow = document.createElement("span");
      arrow.className = "material-icons";
      arrow.textContent = "chevron_right";
      this.hierarchy.appendChild(arrow);

      const item = document.createElement("span");
      item.className = "breadcrumb-item";
      item.textContent = folder.name;
      item.addEventListener("click", () => this.navigateToIndex(index));
      this.hierarchy.appendChild(item);
    });
  }

  navigateToHome() {
    this.currentPath.length = 0;
    folderManager.openFolder(null);
    this.renderHierarchy();
    this.notifyNavigation();
  }

  navigateToIndex(index) {
    this.currentPath.length = index + 1;
    folderManager.openFolder(this.currentPath[index].id);
    this.renderHierarchy();
    this.notifyNavigation();
  }

  openFolder(folder) {
    this.currentPath.push({ id: folder.id, name: folder.name });
    folderManager.openFolder(folder.id);
    this.renderHierarchy();
    this.notifyNavigation();
  }

  goBack() {
    this.currentPath.pop();
    const folderId =
      this.currentPath.length === 0 ? null : this.currentPath[this.currentPath.length - 1].id;
    folderManager.openFolder(folderId);
    this.renderHierarchy();
    this.notifyNavigation();
  }
}

const explorerHierarchy = new ExplorerHierarchy();

export default explorerHierarchy;
