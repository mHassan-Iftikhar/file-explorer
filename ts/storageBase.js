class StorageBase {
    constructor() {
        if (new.target === StorageBase) {
            throw new TypeError("Cannot instantiate abstract class StorageBase directly.");
        }
    }

    getData(key) {
        throw new Error("Method 'getData(key)' must be implemented.");
    }

    saveData(key, data) {
        throw new Error("Method 'saveData(key, data)' must be implemented.");
    }

    clear(key) {
        throw new Error("Method 'clear(key)' must be implemented.");
    }
}

class LocalStorageService extends StorageBase {
    constructor() {
        super();
    }

    getData(key) {
        const data = localStorage.getItem(key);
        if (!data || data === "undefined") {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch (error) {
            console.error("Corrupted JSON found in localStorage:", error);
            return null;
        }
    }

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    clear(key) {
        localStorage.removeItem(key);
    }
}

const store = new LocalStorageService();
export default store;