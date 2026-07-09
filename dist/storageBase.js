class LocalStorageService {
    getData(key) {
        const data = localStorage.getItem(key);
        if (!data || data === "undefined") {
            return null;
        }
        try {
            return JSON.parse(data);
        }
        catch (error) {
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
export default new LocalStorageService();
//# sourceMappingURL=storageBase.js.map