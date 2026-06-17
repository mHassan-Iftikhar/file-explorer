import { store } from "./store.js";

class Utils {
  doesNameExist(name) {
    const items = store.getData();
    return items.some(item => item.name.toLowerCase() === name.toLowerCase());
  }

  getUniqueName(base = "New Folder") {
    const items = store.getData();
    let name = base;
    let i = 0;
    while (items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      i += 1;
      name = `${base} (${i})`;
    }
    return name;
  }
}

const duplication = new Utils();
export default duplication;