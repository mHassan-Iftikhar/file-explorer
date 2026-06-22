import ui from "./ui.js";
import { toolbarState } from "./toolbar-state.js";

class ToolbarDropdownController {
  constructor() {
    this.dropdownConfig = [
      {
        button: document.querySelector(".create-new-items"),
        dropdown: document.querySelector(".new-dropdown"),
        items: [
          {
            icon: "📁",
            label: "Folder",
            className: "new-select",
            action: () => ui.renderFolder(),
          },
          {
            icon: "🔗",
            label: "Shortcut",
            className: "new-select",
            action: () => {},
          },
          {
            icon: "📁",
            label: "Microsoft Access Database",
            className: "new-select",
            action: () => {},
          },
        ],
      },
      {
        button: document.querySelector("#sort-items"),
        dropdown: document.querySelector(".sort-items_dropdown"),
        items: [
          { label: "Name", className: "sort-select", action: () => {} },
          {
            label: "Ascending",
            className: "sort-select",
            action: () => {
              toolbarState.sortDirection = "asc";
              ui.renderCurrentFolder();
            },
          },
          {
            label: "Descending",
            className: "sort-select",
            action: () => {
              toolbarState.sortDirection = "desc";
              ui.renderCurrentFolder();
            },
          },
        ],
      },
      {
        button: document.querySelector("#view-items"),
        dropdown: document.querySelector(".view-items_dropdown"),
        items: [
          {
            label: "Grid",
            className: "view-select",
            action: () => {
              toolbarState.viewMode = "grid";
              ui.renderCurrentFolder();
            },
          },
          {
            label: "List",
            className: "view-select",
            action: () => {
              toolbarState.viewMode = "list";
              ui.renderCurrentFolder();
            },
          },
          {
            label: "Details",
            className: "view-select",
            action: () => {
              toolbarState.viewMode = "details";
              ui.renderCurrentFolder();
            },
          },
        ],
      },
      {
        button: document.querySelector("#filter-items"),
        dropdown: document.querySelector(".filter-items_dropdown"),
        items: [
          {
            label: "All",
            className: "filter-select",
            action: () => {
              toolbarState.filterMode = "all";
              ui.renderCurrentFolder();
            },
          },
          {
            label: "With Children",
            className: "filter-select",
            action: () => {
              toolbarState.filterMode = "with-children";
              ui.renderCurrentFolder();
            },
          },
          {
            label: "Empty Folders",
            className: "filter-select",
            action: () => {
              toolbarState.filterMode = "empty";
              ui.renderCurrentFolder();
            },
          },
        ],
      },
    ];

    this.init();
  }

  init() {
    this.dropdownConfig.forEach(({ button, dropdown, items }) => {
      if (!button || !dropdown) return;

      this.renderMenu(dropdown, items);

      button.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleDropdown(dropdown);
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInside = this.dropdownConfig.some(({ button, dropdown }) => {
        return button?.contains(event.target) || dropdown?.contains(event.target);
      });

      if (!clickedInside) {
        this.hideAllDropdowns();
      }
    });
  }

  renderMenu(dropdown, items) {
    if (!dropdown) return;

    dropdown.innerHTML = "";
    const container = document.createElement("div");
    container.className = `${dropdown.className}__items`;

    items.forEach(({ icon, label, className, action }) => {
      const item = document.createElement("div");
      item.className = className;
      item.innerHTML = icon
        ? `<span>${icon}</span><span>${label}</span>`
        : `<span>${label}</span>`;

      item.addEventListener("click", (event) => {
        event.stopPropagation();
        action?.();
        this.hideAllDropdowns();
      });

      container.appendChild(item);
    });

    dropdown.appendChild(container);
  }

  hideAllDropdowns() {
    this.dropdownConfig.forEach(({ dropdown }) => {
      if (dropdown) {
        dropdown.style.display = "none";
      }
    });
  }

  toggleDropdown(targetDropdown) {
    const isOpen = targetDropdown?.style.display === "block";
    this.hideAllDropdowns();

    if (!isOpen && targetDropdown) {
      targetDropdown.style.display = "block";
    }
  }
}

new ToolbarDropdownController();
