import type { FolderItem } from "./types.js";
declare class FileSystemManagerService {
    #private;
    storage: {
        getData(key: string): unknown;
        saveData(key: string, data: unknown): void;
        clear(key: string): void;
    };
    currentFolderId: number | null;
    getCurrentChildren(): FolderItem[];
    doesNameExist(name: string, excludeId?: number | string | null): boolean;
    getUniqueName(base?: string): string;
    openFolder(id: number | string | null): void;
    goBack(): void;
    createFolder(id?: number, name?: string, parentId?: number | null): FolderItem | null;
    renameFolder(id: number, newName: string): FolderItem | null;
    deleteFolder(id: number | string): FolderItem[];
    removeFolder(id: number | string, folders: FolderItem[]): boolean;
    findFolder(id: number | string, folders: FolderItem[]): FolderItem | null;
    findParent(id: number | string, folders: FolderItem[]): FolderItem | null;
    loadFolders(): FolderItem[];
}
export declare const FileSystemManager: FileSystemManagerService;
export default FileSystemManager;
//# sourceMappingURL=fileSystemManager.d.ts.map