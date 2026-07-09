import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { UIComponents } from "./uiComponents.js";
import type { FolderItem } from "./types.js";
import type { SortDirection, FilterMode } from "./types.js";
export declare class FolderRenderer extends UIComponents {
    #private;
    constructor(containerSelecter?: HTMLElement | null, fileSystemManager?: typeof fileManager);
    renderItem(item: FolderItem): void;
    render(): void;
    renderNewFolder(): void;
    renameItem(itemId: string): HTMLElement | null;
    setViewMode(mode: string): void;
    setSortDirection(dir: SortDirection): void;
    setFilterMode(mode: FilterMode): void;
    applySort(items: FolderItem[]): FolderItem[];
    applyFilter(items: FolderItem[]): FolderItem[];
}
//# sourceMappingURL=folderRenderer.d.ts.map