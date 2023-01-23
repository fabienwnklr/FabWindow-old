# Event and callbacks

## Docs

| Event      | Params   | Description                               |
| ---------- | -------- | ----------------------------------------- |
| fullScreen | FabModal | Event triggered when modal is fullscrened |
| restore    | FabModal | Event triggered when modal is restored    |
| show       | FabModal | Event triggered when modal is shown       |
| hide       | FabModal | Event triggered when modal is hidden      |
| close      | FabModal | Event triggered when modal is closed      |

## Events Examples

```js
myModal.$el.on("fullScreen", () => {
  console.log("FullScreened")
})
```

```js
myModal.$el.on("restore", () => {
  console.log("Restored")
})
```

```js
myModal.$el.on("show", () => {
  console.log("Shown")
})
```

```js
myModal.$el.on("hide", () => {
  console.log("Hidden")
})
```

```js
myModal.$el.on("close", () => {
  console.log("Closed")
})
```

## Callback

| Callback     | Params   | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| onfullScreen | FabModal | Callback triggered when modal is fullscrened |
| onRestore    | FabModal | Callback triggered when modal is restored    |
| onShow       | FabModal | Callback triggered when modal is shown       |
| onHide       | FabModal | Callback triggered when modal is hidden      |
| beforeClose  | FabModal | Callback triggered when modal is hidden      |
| onClose      | FabModal | Callback triggered when modal is hidden      |

## Callbacks Examples

```js
const myModal = new FabModal({
  onFullScreen: () => {
    console.log("fullScreen")
  },
})
```

```js
const myModal = new FabModal({
  onRestore: () => {
    console.log("reostored")
  },
})
```

```js
const myModal = new FabModal({
  onShow: () => {
    console.log("shown")
  },
})
```

```js
const myModal = new FabModal({ beforeClose: () => {
    console.log('before clos
    }e')})
```

```js
const myModal = new FabModal({
  onClose: () => {
    console.log("closed")
  },
})
```