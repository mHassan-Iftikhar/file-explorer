const STORAGE_KEY = "folders";

class LocalStorage {
  getData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}

const store = new LocalStorage();

export { store };