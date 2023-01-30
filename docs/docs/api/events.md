# Event and callbacks

In the usage documentation, a few callbacks are listed that allow you to listen to specific events. Callbacks aren't always ideal, though, specifically when you wish to have multiple handlers.

## Docs

| Event      | Params   | Description                               |
| ---------- | -------- | ----------------------------------------- |
| fullScreen | FabWindow | Event triggered when modal is fullscrened |
| restore    | FabWindow | Event triggered when modal is restored    |
| show       | FabWindow | Event triggered when modal is shown       |
| hide       | FabWindow | Event triggered when modal is hidden      |
| close      | FabWindow | Event triggered when modal is closed      |

## Events Examples

```js
myModal.on("fullScreen", () => {
  console.log("FullScreened")
})
```

```js
myModal.on("restore", () => {
  console.log("Restored")
})
```

```js
myModal.on("show", () => {
  console.log("Shown")
})
```

```js
myModal.on("hide", () => {
  console.log("Hidden")
})
```

```js
myModal.on("close", () => {
  console.log("Closed")
})
```

## Callback

| Callback     | Params   | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| onfullScreen | FabWindow | Callback triggered when modal is fullscrened |
| onRestore    | FabWindow | Callback triggered when modal is restored    |
| onShow       | FabWindow | Callback triggered when modal is shown       |
| onHide       | FabWindow | Callback triggered when modal is hidden      |
| beforeClose  | FabWindow | Callback triggered when modal is hidden      |
| onClose      | FabWindow | Callback triggered when modal is hidden      |

## Callbacks Examples

```js
const myModal = new FabWindow({
  onFullScreen: () => {
    console.log("fullScreen")
  },
})
```

```js
const myModal = new FabWindow({
  onRestore: () => {
    console.log("reostored")
  },
})
```

```js
const myModal = new FabWindow({
  onShow: () => {
    console.log("shown")
  },
})
```

```js
const myModal = new FabWindow({ beforeClose: () => {
    console.log('before clos
    }e')})
```

```js
const myModal = new FabWindow({
  onClose: () => {
    console.log("closed")
  },
})
```
