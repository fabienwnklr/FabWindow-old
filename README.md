# FabWindow

FabWindow is a modal and modal management solution. FabWindow provides the ability to create event driven modal based on light and modern styles.

[Documentation](https://netlify.fabwindow.fr/docs)

## Installation

Install FabWindow with npm or yarn

- Using npm

```bash
  npm install FabWindow
```

- or using yarn

```bash
 yarn add FabWindow
```

## Usage/Examples

### Using module

- With modal manager

```javascript
import FabWindowManager from "FabWindowManager";

const myModalManager = new FabWindowManager(options);
const myModal = myModalManager.createModal(options);
```

- With simple modal

```javascript
import FabWindow from "FabWindowe";

const myModal = new FabWindow(options);
```

### Using es5

- With modal manager

```html
<script src="path/to/FabWindowManager.js">

const myModalManager = new FabWindowManager(options);
const myModal = myModalManager.createModal(options);
```

- With simple modal

```html
<script src="path/to/FabWindow.js">

const myModal = new FabWindow(options);
```
