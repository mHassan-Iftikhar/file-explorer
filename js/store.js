class LocalStorage {
  getData() {
    return JSON.parse(localStorage.getItem("folders")) || [];
  }

  saveData(data) {
    localStorage.setItem("folders", JSON.stringify(data));
  }

  clear() {
    localStorage.removeItem("folders");
  }
}

const store = new LocalStorage();

export { store };