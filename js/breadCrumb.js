import explorerHierarchy from "./explorer-hierarchy.js";

const backButton = document.querySelector("#chevron-left");

backButton?.addEventListener("click", () => {
  explorerHierarchy.goBack();
});

explorerHierarchy.renderHierarchy();
