# UML Diagram

This diagram is based on the current JavaScript modules in the file explorer app.

## Class Diagram

```mermaid
classDiagram
    class Folder {
      +id
      +name
      +children
    }

    class LocalStorage {
      +getData()
      +saveData(data)
      +clear()
    }

    class FolderManager {
      +openFolder(id)
      +goBack()
      +getCurrentChildren()
      +createFolder(name)
      +renameFolder(id, newName)
      +deleteFolder(id)
      +removeFolder(id, folders)
      +getAll()
      +findFolder(id, folders)
      +findParent(targetId, folders)
    }

    class UI {
      +renderFolderItem(folder)
      +renderFolder()
      +renderNewFolder()
      +renameFolderUI(folderId)
      +renderCurrentFolder()
      +renderAll()
    }

    class DeleteFolder {
      +showContextMenu(x, y, folderId)
    }

    class ExplorerHierarchy {
      +notifyNavigation()
      +renderHierarchy()
      +navigateToHome()
      +navigateToIndex(index)
      +openFolder(folder)
      +goBack()
    }

    class SearchController {
      +start()
    }

    class ToolbarDropdownController {
      +init()
      +renderMenu(dropdown, items)
      +hideAllDropdowns()
      +toggleDropdown(targetDropdown)
    }

    class toolbarState {
      +sortDirection
      +viewMode
      +filterMode
    }

    class store {
      +getData()
      +saveData(data)
      +clear()
    }

    FolderManager --> LocalStorage : uses
    LocalStorage --> store : instance
    FolderManager --> Folder : creates
    UI --> FolderManager : creates / renames / deletes
    UI --> ExplorerHierarchy : opens folder
    UI --> toolbarState : reads view, sort, filter
    DeleteFolder --|> UI
    ExplorerHierarchy --> FolderManager : openFolder()
    ExplorerHierarchy --> UI : dispatches navigation event
    SearchController --> store : filters data
    SearchController --> UI : renders matches
    ToolbarDropdownController --> UI : triggers actions
    ToolbarDropdownController --> toolbarState : updates view state
```

## Main Flow

```mermaid
flowchart TD
    A[main.js] --> B[ui.renderCurrentFolder()]
    A --> C[searchController.start()]
    A --> D[action-bar-dropdowns.js init]

    E[User opens folder] --> F[ExplorerHierarchy.openFolder()]
    F --> G[FolderManager.openFolder(id)]
    F --> H[renderHierarchy()]
    F --> I[window dispatch explorer:navigate]
    I --> B

    J[User types in search] --> K[SearchController.start() input handler]
    K --> L[store.getData()]
    K --> M[ui.renderFolderItem()]

    N[User creates/renames/deletes folder] --> O[UI methods]
    O --> P[FolderManager create/rename/delete]
    P --> Q[store.saveData()]
    P --> B
```

## Notes

- `main.js` is the startup point.
- `ui.js` controls rendering and context-menu actions.
- `explorer-hierarchy.js` owns breadcrumb navigation and fires the `explorer:navigate` event.
- `folder.js` owns the folder tree, current folder state, and persistence via `store.js`.
- `search.js` renders filtered results directly into the content grid.
- `action-bar-dropdowns.js` changes `toolbarState` and re-renders the current folder view.