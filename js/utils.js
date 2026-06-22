import { folderManager } from "./folder.js";
import toast from "./toast.js";

class Utils {
  doesNameExist(name, excludeId = null) {
    const items = folderManager.getCurrentChildren();
    const exists = items.some(
      (item) =>
        item.id !== Number(excludeId) &&
        item.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      toast.toastMessage("This name already exists", "failed!");
    }

    return exists;
  }

  getUniqueName(base = "New Folder") {
    const items = folderManager.getCurrentChildren();
    let name = base;
    let i = 0;

    while (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      i += 1;
      name = `${base} (${i})`;
    }

    return name;
  }
}

const duplication = new Utils();
export default duplication;
