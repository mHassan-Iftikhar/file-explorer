import type { SortDirection, ViewMode, FilterMode, Route } from "./types.js";
declare class AppState {
    #private;
    getActiveRoute(): Route;
    getSortDirection(): SortDirection;
    getViewMode(): ViewMode;
    getFilterMode(): FilterMode;
    getIsMaximized(): boolean;
    getIsDragging(): boolean;
    setActiveRoute(activeRoute: Route): void;
    setSortDirection(sortDirection: SortDirection): void;
    setViewMode(viewMode: ViewMode): void;
    setFilterMode(filterMode: FilterMode): void;
    setIsMaximized(isMaximized: boolean): void;
    setIsDragging(isDragging: boolean): void;
}
declare const app: AppState;
export default app;
//# sourceMappingURL=appState.d.ts.map