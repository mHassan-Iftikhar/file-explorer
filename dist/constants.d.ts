export declare const Selectors: {
    readonly COMMAND_BAR: "#command-bar-search";
    readonly CONTENT_GRID: "#contentGrid";
    readonly NEW_BUTTON: ".create-new-items";
    readonly NEW_DROPDOWN: "#new-dropdown";
    readonly SORT_ITEMS: "#sort-items";
    readonly REFERESH_BUTTON: "#refresh-btn";
    readonly FOLDER_ITEM: "div.folder-item";
    readonly FOLDER_ICON: ".folder-item__icon";
    readonly FOLDER_NAME: ".folder-item__name";
    readonly FOLDER_RENAME_INPUT: ".folder-item__rename-input";
};
export declare const Labels: {
    readonly NEW_FOLDER: "New Folder";
    readonly NEW_FILE: "New File";
    readonly NEW_DOCUMENT: "New Document";
    readonly RENAME: "Rename";
    readonly DELETE: "Delete";
    readonly SORT_NAME: "Name";
    readonly SORT_ASCENDING: "Aascending";
    readonly SORT_DESCENDING: "Descending";
    readonly NO_RESULTS: "No results found.";
};
export declare const DropdownIds: {
    readonly NEW_FOLDER: "newFolder";
    readonly NEW_FILE: "newFile";
    readonly NEW_DOCUMENT: "newDocument";
};
export declare const ElementIds: {
    readonly NEW_DROPDOWN_ITEMS: "new-dropdown-items";
};
export declare const ToolbarConfig: {
    readonly DROPDOWN_ITEMS: ({
        ICON: string;
        NAME: "New Folder";
        id: "newFolder";
    } | {
        ICON: string;
        NAME: "New File";
        id: "newFile";
    } | {
        ICON: string;
        NAME: "New Document";
        id: "newDocument";
    })[];
    readonly FOLDER_MENU_ITEMS: ({
        ITEM: "Rename";
    } | {
        ITEM: "Delete";
    })[];
    readonly SORT_DROPDOWN_ITEMS: ({
        ITEM: "Name";
    } | {
        ITEM: "Aascending";
    } | {
        ITEM: "Descending";
    })[];
};
//# sourceMappingURL=constants.d.ts.map