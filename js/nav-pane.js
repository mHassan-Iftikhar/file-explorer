import breadcrumbNavigator from "./explorer-hierarchy.js";
import ui from "./ui.js";
import { folderManager } from "./folder.js";
import { routeState } from "./route-state.js";

const navItems = document.querySelectorAll(".nav-pane-tabs");

function setActiveNavItem(activeRoute) {
  navItems.forEach((item) => {
    item.classList.toggle("nav-pane-tabs--active", item.dataset.route === activeRoute);
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const routeKey = item.dataset.route || "home";

    routeState.activeRoute = routeKey;
    folderManager.openFolder(null);
    breadcrumbNavigator.resetPath();
    setActiveNavItem(routeKey);
    ui.renderCurrentFolder();
  });
});

setActiveNavItem(routeState.activeRoute);
