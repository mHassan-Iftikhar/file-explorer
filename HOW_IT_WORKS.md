# How the file explorer flow works

This app is a small folder explorer built around four main pieces:

- [index.html](index.html) loads the UI shell and module scripts.
- [js/main.js](js/main.js) wires startup behavior and the first render.
- [js/ui.js](js/ui.js) renders folders and handles folder-item interactions.
- [js/folder.js](js/folder.js) owns folder state and CRUD operations.
- [js/explorer-hierarchy.js](js/explorer-hierarchy.js) tracks navigation and breadcrumbs.
- [js/store.js](js/store.js) persists data in localStorage.

## Startup flow

1. The browser loads [index.html](index.html).
2. The page includes the JavaScript modules with `type="module"`.
3. [js/main.js](js/main.js) imports the UI, search, and dropdown modules.
4. `main.js` immediately calls `ui.renderCurrentFolder()`.
5. That first render reads the current folder list from storage and paints the content grid.
6. `searchController.start()` attaches the search input listener.

## How folders are rendered

1. [js/ui.js](js/ui.js) asks [js/folder.js](js/folder.js) for the current children with `folderManager.getCurrentChildren()`.
2. `folderManager` returns either the top-level folders or the children of the currently open folder.
3. `ui.js` sorts the folders based on the toolbar state.
4. For each folder, `renderFolderItem()` creates a DOM element with the folder name and icon.
5. The folder tile gets two important listeners:
   - right click opens the context menu
   - double click opens the folder

## Double-click open flow

This is the path used when you double click a folder:

1. `ui.renderFolderItem(folder)` attaches a `dblclick` listener.
2. The listener calls `breadcrumbNavigator.openFolder(folder)`.
3. [js/explorer-hierarchy.js](js/explorer-hierarchy.js) pushes the folder into `currentPath`.
4. `breadcrumbNavigator` calls its internal navigation commit.
5. That commit calls `folderManager.openFolder(folder.id)`.
6. `folderManager` updates `currentFolderId`.
7. `breadcrumbNavigator` rerenders the breadcrumb bar.
8. `breadcrumbNavigator` dispatches the `explorer:navigate` event.
9. [js/main.js](js/main.js) listens for that event and calls `ui.renderCurrentFolder()`.
10. `ui.renderCurrentFolder()` reads the new current folder and renders the next level.

So the double-click does not directly change the DOM by itself. It updates navigation state first, then the app rerenders from that new state.

## Breadcrumb flow

The breadcrumb bar is the visual record of where you are:

1. [js/explorer-hierarchy.js](js/explorer-hierarchy.js) keeps `currentPath`.
2. When you open a folder, the folder gets appended to `currentPath`.
3. `renderBreadcrumbs()` clears the breadcrumb area and rebuilds it.
4. Clicking a breadcrumb item calls `navigateToHome()` or `navigateToIndex(index)`.
5. Those methods update `currentPath`, commit navigation, and trigger another rerender.

## Creating a folder

1. The New button in [js/main.js](js/main.js) calls `ui.renderFolder()`.
2. `ui.renderNewFolder()` inserts an input into the grid.
3. Pressing Enter or blurring the input saves the folder.
4. `folderManager.createFolder(Date.now(), name)` creates the folder object.
5. [js/folder.js](js/folder.js) stores the folder in the current location.
6. [js/store.js](js/store.js) saves the updated tree to localStorage.
7. The UI rerenders so the new folder appears immediately.

## Renaming and deleting

- Right click a folder to open the context menu.
- Rename swaps the folder label for an input and calls `folderManager.renameFolder()` on save.
- Delete calls `folderManager.deleteFolder()` and then rerenders the current view.

## Search flow

1. [js/search.js](js/search.js) listens to the search input.
2. It flattens the folder tree to build a searchable list.
3. If the search box is empty, it returns to `ui.renderCurrentFolder()`.
4. If text is present, it filters matching folders and renders those results.

## Data flow

The persistent data lives in localStorage through [js/store.js](js/store.js):

- `getData()` reads the saved folder tree.
- `saveData()` writes the latest tree back to storage.
- `folder.js` is the single owner of folder mutation logic.
- `ui.js` never edits storage directly; it always goes through `folderManager`.

## Mental model

A good way to think about the app is:

- `store.js` is the database layer
- `folder.js` is the state and mutation layer
- `ui.js` is the rendering and interaction layer
- `explorer-hierarchy.js` is the navigation layer
- `main.js` is the startup and wiring layer

If double-clicking does not appear to enter a folder, check this chain first:

1. The `dblclick` listener in [js/ui.js](js/ui.js)
2. `breadcrumbNavigator.openFolder(folder)` in [js/explorer-hierarchy.js](js/explorer-hierarchy.js)
3. `folderManager.openFolder(folder.id)` in [js/folder.js](js/folder.js)
4. The `explorer:navigate` listener in [js/main.js](js/main.js)
5. The rerender in `ui.renderCurrentFolder()`
