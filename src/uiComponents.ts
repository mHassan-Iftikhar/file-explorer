import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { Selectors } from "./constants.js";

export class UIComponents {
    #container: HTMLElement | null = document.querySelector(Selectors.CONTENT_GRID);
    #fileManager: typeof fileManager;

    constructor(container?: HTMLElement | null, fileManagerInstance?: typeof fileManager) {
        if (container !== undefined) {
            this.#container = container;
        }
        this.#fileManager = fileManagerInstance ?? fileManager;
    }

    render() {
        throw new Error("Method 'render()' must be implemented.");
    }

    clear() {
        if (this.#container) {
            this.#container.innerHTML = '';
        }
    }

    get container() {
        return this.#container;
    }

    createElement(tag: string, className?: string): HTMLElement  {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }
}