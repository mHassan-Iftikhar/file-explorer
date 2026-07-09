export interface FolderItem {
    id: number;
    name: string;
    parentId: number | null;
    subFolders: FolderItem[];
    type: "folder" | "file" | "document";
}

export interface DropdownItem {
    ICON: string;
    NAME: string;
    id: string;
}

export interface MenuItem {
    ITEM: string;
}

export type SortDirection = "asc" | "desc";
export type ViewMode = "grid" | "list";
export type FilterMode = "all" | "files" | "folders";
export type Route = "home" | "gallery" | "personal" | "desktop" | "downloads" | "documents" | "camera" | "music" | "videos";