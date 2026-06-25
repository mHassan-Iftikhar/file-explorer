import { folderManager } from "./folder.js";
import { routeState } from "./route-state.js";

class BreadcrumbNavigator {
  constructor() {
    this.hierarchy = document.querySelector(".command-bar-center");
    this.currentPath = [];
  }

  createIcon(name) {
    const icon = document.createElement("span");
    icon.className = "material-icons";
    icon.textContent = name;
    return icon;
  }

  createBreadcrumbItem(label, onClick) {
    const item = document.createElement("span");
    item.textContent = label;
    item.style.cursor = "pointer";
    item.addEventListener("click", onClick);
    return item;
  }

  #commitNavigation(folderId) {
    folderManager.openFolder(folderId);
    this.renderBreadcrumbs();
    this.notifyNavigation();
  }

  notifyNavigation() {
    window.dispatchEvent(new Event("explorer:navigate"));
  }

  getActiveRouteInfo() {
    const activeRoute = routeState.activeRoute || "home";
    const activeTab = document.querySelector(`.nav-pane-tabs[data-route="${activeRoute}"]`);
    if (activeTab) {
      const iconEl = activeTab.querySelector(".material-icons");
      const labelEl = activeTab.querySelector("span:not(.material-icons)");
      return {
        icon: iconEl ? iconEl.textContent.trim() : "home",
        label: labelEl ? labelEl.textContent.trim() : "Home"
      };
    }
    return { icon: "home", label: "Home" };
  }

  renderBreadcrumbs() {
    if (!this.hierarchy) return;

    this.hierarchy.innerHTML = "";
    
    const routeInfo = this.getActiveRouteInfo();
    this.hierarchy.appendChild(this.createIcon(routeInfo.icon));
    this.hierarchy.appendChild(
      this.createBreadcrumbItem(routeInfo.label, () => this.navigateToHome())
    );

    this.currentPath.forEach((folder, index) => {
      this.hierarchy.appendChild(this.createIcon("chevron_right"));
      this.hierarchy.appendChild(
        this.createBreadcrumbItem(folder.name, () => this.navigateToIndex(index))
      );
    });
  }

  navigateToHome() {
    this.currentPath.length = 0;
    this.#commitNavigation(null);
  }

  navigateToIndex(index) {
    this.currentPath.length = index + 1;
    this.#commitNavigation(this.currentPath[index].id);
  }

  openFolder(folder) {
    this.currentPath.push({ id: folder.id, name: folder.name });
    this.#commitNavigation(folder.id);
  }

  goBack() {
    this.currentPath.pop();
    const folderId = this.currentPath.at(-1)?.id ?? null;
    this.#commitNavigation(folderId);
  }

  resetPath() {
    this.currentPath = [];
    this.renderBreadcrumbs();
  }
}

const breadcrumbNavigator = new BreadcrumbNavigator();

export default breadcrumbNavigator;
