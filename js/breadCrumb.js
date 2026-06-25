import breadcrumbNavigator from "./explorer-hierarchy.js";

const backButton = document.querySelector("#chevron-left");

backButton?.addEventListener("click", () => {
  breadcrumbNavigator.goBack();
});

breadcrumbNavigator.renderBreadcrumbs();
