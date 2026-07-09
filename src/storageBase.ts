class LocalStorageService {
    getData(key: string): unknown {
        const data = localStorage.getItem(key);
        if (!data || data === "undefined") {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch (error) {
            // console.error("Corrupted JSON found in localStorage:", error);
            return null;
        }
    }

    saveData(key: string, data: unknown) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    clear(key: string) {
        localStorage.removeItem(key);
    }
}

export default new LocalStorageService();