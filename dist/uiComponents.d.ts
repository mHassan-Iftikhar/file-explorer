import { FileSystemManager as fileManager } from "./fileSystemManager.js";
export declare class UIComponents {
    #private;
    constructor(container?: HTMLElement | null, fileManagerInstance?: typeof fileManager);
    render(): void;
    clear(): void;
    get container(): HTMLElement | null;
    createElement<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K];
}
//# sourceMappingURL=uiComponents.d.ts.map