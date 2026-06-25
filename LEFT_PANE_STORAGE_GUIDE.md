# Left Pane Storage Guide

This file explains the left pane in very simple words.

## What the left pane does

The left pane is the list on the side with items like Home, Gallery, Documents, Pictures, Music, and Videos.

Each item should behave like a separate place in the app.

So when you click one item:

1. The app remembers which item you clicked.
2. The app loads folders for that item only.
3. The app shows those folders in the main area.
4. If you create or delete folders, the changes stay only in that item.

## What a route key is

The route key is just a label you choose for each left-pane item.

It is not something special from the browser.

Examples:

- Home -> `home`
- Gallery -> `gallery`
- Documents -> `documents`
- Pictures -> `camera`
- Music -> `music`
- Videos -> `videos`

You already put these labels in [index.html](index.html) using `data-route`:

```html
<div class="nav-pane-tabs" data-route="home">...</div>
<div class="nav-pane-tabs" data-route="gallery">...</div>
<div class="nav-pane-tabs" data-route="documents">...</div>
```

So the route key comes from the HTML attribute `data-route`.

## Simple idea

Think of each route as its own box of folders.

- Home has one box.
- Gallery has another box.
- Documents has another box.

When you click a route, the app opens the matching box.

## What has to happen in code

### 1. Read the clicked route

When the user clicks a left-pane item, JavaScript reads `data-route`.

Example:

```js
const routeKey = item.dataset.route;
```

If the clicked item is Home, then `routeKey` becomes `home`.

### 2. Save the active route in memory

The app should store the current route in one small state value, for example `activeRoute`.

That means:

```js
activeRoute = "home";
```

### 3. Use that route key in localStorage

Instead of saving everything in one place, the app should save each route in a different localStorage key.

Example:

```js
folders:home
folders:gallery
folders:documents
```

So if you click Gallery, the app reads and writes `folders:gallery`.

## How the flow works

Here is the full flow in plain language:

1. You click a left-pane item.
2. JavaScript reads its `data-route` value.
3. The app stores that value as the active route.
4. The storage code uses that route to choose the right localStorage key.
5. The folder manager loads the folders for that route.
6. The UI redraws the folder list.

That is why the route key matters. It tells the app which folder box to use.

## Why this is useful

Without route keys, all routes would share the same folder data.

That means Home, Gallery, and Documents would all show the same folders.

With route keys, each route keeps its own separate folder list.

## Small code picture

This is the idea, not final code:

```js
// Left pane click
routeKey = item.dataset.route;

// Store uses routeKey to pick the correct localStorage key
const storageKey = `folders:${routeKey}`;

// UI rerenders the right folders
ui.renderCurrentFolder();
```

## Important detail

When the route changes, the app should go back to the top of that route.

So if you were inside a folder in Home and then click Documents, the app should not stay inside the old Home folder.

Usually this means resetting the current folder id to `null` when the route changes.

## In one sentence

The route key is just the name of the left-pane item, and the app uses that name to save and load a separate folder list for that item.