# FabModal

FabModal is a modal and modal management solution. FabModal provides the ability to create event driven modal based on light and modern styles.

[Documentation](https://netlify.fabwindow.fr/docs)

## Installation

Install FabModal with npm or yarn

- Using npm

```bash
  npm install FabModal
```

- or using yarn

```bash
 yarn add FabModal
```

## Usage/Examples

### Using module

- With modal manager

```javascript
import FabModalManager from "FabModalManager"

const myModalManager = new FabModalManager(options)
const myModal = myModalManager.createModal(options)
```

- With simple modal

```javascript
import FabModal from "FabModale"

const myModal = new FabModal(options)
```

### Using es5

- With modal manager

```html
<script src="path/to/FabModalManager.js">

const myModalManager = new FabModalManager(options);
const myModal = myModalManager.createModal(options);
```

- With simple modal

```html
<script src="path/to/FabModal.js">

const myModal = new FabModal(options);
```
