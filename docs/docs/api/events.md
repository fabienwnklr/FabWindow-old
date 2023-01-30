# Event and callbacks

In the usage documentation, a few callbacks are listed that allow you to listen to specific events. Callbacks aren't always ideal, though, specifically when you wish to have multiple handlers.

## Docs

| Event      | Method    |Params   | Description                               |
| ---------- | --------  | -------- | ----------------------------------------- |
| fullScreen | onFullScreen | FabWindow | Event triggered when modal is fullscrened |
| restore    | onRestore | FabWindow | Event triggered when modal is restored    |
| show       | onShow | FabWindow | Event triggered when modal is shown       |
| hide       | onHide | FabWindow | Event triggered when modal is hidden      |
| close      | onClose | FabWindow | Event triggered when modal is closed      |

## Events Examples

```js
// As property
const myWindow = new FabWindow({
  onFullScreen: () => {
    console.log("FullScreened")
  }
})

// or as basic event listener

const myWindow = new FabWindow()
myWindow.on("fullScreen", () => {
  console.log("FullScreened")
})
```

```js
myWindow.on("restore", () => {
  console.log("Restored")
})
```

```js
myWindow.on("show", () => {
  console.log("Shown")
})
```

```js
myWindow.on("hide", () => {
  console.log("Hidden")
})
```

```js
myWindow.on("close", () => {
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
const myWindow = new FabWindow({
  onFullScreen: () => {
    console.log("fullScreen")
  },
})
```

```js
const myWindow = new FabWindow({
  onRestore: () => {
    console.log("reostored")
  },
})
```

```js
const myWindow = new FabWindow({
  onShow: () => {
    console.log("shown")
  },
})
```

```js
const myWindow = new FabWindow({ beforeClose: () => {
    console.log('before clos
    }e')})
```

```js
const myWindow = new FabWindow({
  onClose: () => {
    console.log("closed")
  },
})
```
