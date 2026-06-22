# Dropdown Approach and Flow

## What This Code Is Doing

This file explorer uses separate toolbar dropdowns for:

- New
- Sort
- View
- Filter

The idea is to keep each toolbar action focused on one job instead of putting all menu behavior into one large block.

## Why I Chose This Approach

I used separate dropdown handling because each menu behaves differently:

- New creates items
- Sort changes item order
- View changes how items are displayed
- Filter reduces which items are visible

That makes the code easier to read, easier to debug, and easier to extend later.

The performance difference between a combined dropdown and separate dropdowns is small for this project, so readability and maintainability matter more.

## Main Files Involved

- [js/action-bar-dropdowns.js](js/action-bar-dropdowns.js)
- [js/ui.js](js/ui.js)
- [js/toolbar-state.js](js/toolbar-state.js)
- [js/breadCrumb.js](js/breadCrumb.js)
- [js/main.js](js/main.js)
- [index.html](index.html)

## File Responsibilities

### `js/action-bar-dropdowns.js`

This is the controller for the toolbar menus.

It does three things:

1. Finds each toolbar button and its dropdown container.
2. Builds the dropdown menu items.
3. Attaches click handlers to open, close, and select menu items.

### `js/toolbar-state.js`

This file stores shared UI state:

- `sortDirection`
- `viewMode`
- `filterMode`

The dropdowns update this state, and the renderer reads from it.

### `js/ui.js`

This file renders the content area.

It uses the toolbar state to:

- sort folders
- filter folders
- adjust the folder layout for different view modes

### `js/breadCrumb.js`

This file handles breadcrumb navigation and the back button.

It should stay focused on navigation, not dropdown behavior.

### `js/main.js`

This is the startup file.

It imports the dropdown controller so the menus are wired when the page loads.

## Runtime Flow

### 1. Page loads

When the app starts, `js/main.js` runs.

It imports:

- `ui`
- `search`
- `action-bar-dropdowns`

That means the layout, search, and dropdown behavior are all initialized on startup.

### 2. Dropdown buttons are wired

`js/action-bar-dropdowns.js` looks up each toolbar button:

- `.create-new-items`
- `#sort-items`
- `#view-items`
- `#filter-items`

For each one, it also finds the matching dropdown container.

Then it renders the menu items and binds click handlers.

### 3. User clicks a toolbar button

When the user clicks a toolbar button:

- the click is intercepted
- the related dropdown opens
- other dropdowns close

If the user clicks the same button again, the menu closes.

### 4. User selects a dropdown item

When a dropdown item is clicked:

- its action runs
- the shared toolbar state may update
- `ui.renderCurrentFolder()` runs again
- all dropdowns close

This is the key pattern: update state first, then re-render the content area.

### 5. UI renders the content area

`js/ui.js` reads the current folder items from `folderManager`.

Then it applies the toolbar state in this order:

1. filter the list
2. sort the list
3. render the items

That keeps the rendering pipeline predictable.

## How Each Menu Works

### New

The New menu calls `ui.renderFolder()` when Folder is selected.

That creates a new folder input inside the content area.

### Sort

Sort updates `toolbarState.sortDirection`.

Then the renderer sorts the folder list before displaying it.

### View

View updates `toolbarState.viewMode`.

Then `ui.renderFolderItem()` changes the item layout for list or details mode.

### Filter

Filter updates `toolbarState.filterMode`.

Then `ui.renderCurrentFolder()` removes items that do not match the selected filter.

## Data Flow Summary

```mermaid
flowchart TD
  A[User clicks toolbar button] --> B[action-bar-dropdowns.js]
  B --> C[Dropdown item selected]
  C --> D[Update toolbarState]
  D --> E[ui.renderCurrentFolder()]
  E --> F[Get folders from folderManager]
  F --> G[Apply filter]
  G --> H[Apply sort]
  H --> I[Render folder items]
```

## Why This Is Easy To Maintain

This structure separates concerns:

- dropdown logic is in one file
- shared state is in one file
- rendering is in one file
- navigation is in one file

That means future changes are safer.

For example:

- if you want to add a new menu item, edit only the dropdown controller
- if you want a new display mode, edit only the UI renderer
- if you want a new filter rule, edit the render pipeline

## Short Version

The flow is:

1. click toolbar button
2. open dropdown
3. choose an action
4. update shared state or create a folder
5. re-render the content area
6. close the dropdown

That is the core behavior of the current implementation.
