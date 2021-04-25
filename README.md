# FabModal

FabModal is a modal and modal management solution. FabModal provides the ability to create event driven modal based on light and modern styles.

## Installation

Install FabModal with npm or yarn

```bash
  npm install FabModal

  // or

  yarn add FabModal
```

## Usage/Examples

- Using module

```javascript
import FabModalManager from "FabModalManager";
// or
import FabModal from "FabModale";

const myModalManager = new FabModalManager(options);
const myModal = myModalManager.createModal(options);
// or
const myModal = new FabModal(options);
```

- Using es5

```html
<!-- Insert js -->
<script src="path/to/FabModalManager.js">
<!-- or -->
<script src="path/to/FabModal.js">
```

```javascript
const myModalManager = new FabModalManager(options);
const myModal = myModalManager.createModal(options);
// or
const myModal = new FabModal(options);
```
