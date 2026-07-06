class AppState {
    #activeRoute = "home";
    #sortDirection = "asc";
    #viewMode = "grid";
    #filterMode = "all";
    #isMaximized = false;
    #isDragging = false;

    getActiveRoute() { return this.#activeRoute; }
    getSortDirection() { return this.#sortDirection; }
    getViewMode() { return this.#viewMode; }
    getFilterMode() { return this.#filterMode; }
    getIsMaximized() { return this.#isMaximized; }
    getIsDragging() { return this.#isDragging; }

    setActiveRoute(activeRoute) { this.#activeRoute = activeRoute; }
    setSortDirection(sortDirection) { this.#sortDirection = sortDirection; }
    setViewMode(viewMode) { this.#viewMode = viewMode; }
    setFilterMode(filterMode) { this.#filterMode = filterMode; }
    setIsMaximized(isMaximized) { this.#isMaximized = isMaximized; }
    setIsDragging(isDragging) { this.#isDragging = isDragging; }
}

const app = new AppState()
export default app