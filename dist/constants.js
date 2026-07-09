export const Selectors = {
    COMMAND_BAR: "#command-bar-search",
    CONTENT_GRID: "#contentGrid",
    NEW_BUTTON: ".create-new-items",
    NEW_DROPDOWN: "#new-dropdown",
    SORT_ITEMS: "#sort-items",
    REFERESH_BUTTON: "#refresh-btn",
    FOLDER_ITEM: "div.folder-item",
    FOLDER_ICON: ".folder-item__icon",
    FOLDER_NAME: ".folder-item__name",
    FOLDER_RENAME_INPUT: ".folder-item__rename-input"
};
export const Labels = {
    NEW_FOLDER: "New Folder",
    NEW_FILE: "New File",
    NEW_DOCUMENT: "New Document",
    RENAME: "Rename",
    DELETE: "Delete",
    SORT_NAME: "Name",
    SORT_ASCENDING: "Aascending",
    SORT_DESCENDING: "Descending",
    NO_RESULTS: "No results found."
};
export const DropdownIds = {
    NEW_FOLDER: "newFolder",
    NEW_FILE: "newFile",
    NEW_DOCUMENT: "newDocument"
};
export const ElementIds = {
    NEW_DROPDOWN_ITEMS: "new-dropdown-items"
};
export const ToolbarConfig = {
    DROPDOWN_ITEMS: [
        { ICON: "📁", NAME: Labels.NEW_FOLDER, id: DropdownIds.NEW_FOLDER },
        { ICON: "📄", NAME: Labels.NEW_FILE, id: DropdownIds.NEW_FILE },
        { ICON: "📂", NAME: Labels.NEW_DOCUMENT, id: DropdownIds.NEW_DOCUMENT }
    ],
    FOLDER_MENU_ITEMS: [
        { ITEM: Labels.RENAME },
        { ITEM: Labels.DELETE }
    ],
    SORT_DROPDOWN_ITEMS: [
        { ITEM: Labels.SORT_NAME },
        { ITEM: Labels.SORT_ASCENDING },
        { ITEM: Labels.SORT_DESCENDING }
    ]
};
//# sourceMappingURL=constants.js.map