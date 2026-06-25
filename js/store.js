import { routeState } from "./route-state.js";

class StorageBase {
  getData() { throw new Error("Method 'getData()' must be implemented."); }
  saveData(data) { throw new Error("Method 'saveData()' must be implemented."); }
  clear() { throw new Error("Method 'clear()' must be implemented."); }
}

class LocalStorageService extends StorageBase {
  #storageKey(routeKey = routeState.activeRoute) {
    return `folders:${routeKey}`;
  }

  getData(routeKey = routeState.activeRoute) {
    try {
      const data = localStorage.getItem(this.#storageKey(routeKey));
      if (data) return JSON.parse(data);

      if (routeKey === "home") {
        const legacyData = localStorage.getItem("folders");
        return legacyData ? JSON.parse(legacyData) : [];
      }

      return [];
    } catch (error) {
      console.error("Error reading data from localStorage:", error);
      return [];
    }
  }

  saveData(data, routeKey = routeState.activeRoute) {
    localStorage.setItem(this.#storageKey(routeKey), JSON.stringify(data));
  }

  clear(routeKey = routeState.activeRoute) {
    localStorage.removeItem(this.#storageKey(routeKey));
  }
}

const store = new LocalStorageService();

export { store };