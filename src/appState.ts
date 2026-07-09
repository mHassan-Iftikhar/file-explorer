import type { SortDirection, ViewMode, FilterMode, Route } from "./types.js";

class AppState {
    #activeRoute: Route = "home";
    #sortDirection: SortDirection = "asc";
    #viewMode: ViewMode = "grid";
    #filterMode: FilterMode = "all";
    #isMaximized: boolean = false;
    #isDragging: boolean = false;

    getActiveRoute(): Route { return this.#activeRoute; }
    getSortDirection(): SortDirection { return this.#sortDirection; }
    getViewMode(): ViewMode { return this.#viewMode; }
    getFilterMode(): FilterMode { return this.#filterMode; }
    getIsMaximized(): boolean { return this.#isMaximized; }
    getIsDragging(): boolean { return this.#isDragging; }

    setActiveRoute(activeRoute: Route) { this.#activeRoute = activeRoute; }
    setSortDirection(sortDirection: SortDirection) { this.#sortDirection = sortDirection; }
    setViewMode(viewMode: ViewMode) { this.#viewMode = viewMode; }
    setFilterMode(filterMode: FilterMode) { this.#filterMode = filterMode; }
    setIsMaximized(isMaximized: boolean) { this.#isMaximized = isMaximized; }
    setIsDragging(isDragging: boolean) { this.#isDragging = isDragging; }
}

const app = new AppState()
export default app