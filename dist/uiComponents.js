import { FileSystemManager as fileManager } from "./fileSystemManager.js";
import { Selectors } from "./constants.js";
export class UIComponents {
    #container = document.querySelector(Selectors.CONTENT_GRID);
    #fileManager;
    constructor(container, fileManagerInstance) {
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
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.className = className;
        return element;
    }
}
//# sourceMappingURL=uiComponents.js.map