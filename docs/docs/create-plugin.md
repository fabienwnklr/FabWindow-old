# Plugin API

Via the microplugin interface, features can be added to FabWindow without modifying the main library. This is great because it protects against code bloat, allows for lean builds, and allows for addons to be sanely isolated. The plugin system isn't meant to be sexy; it's lean, makes very few assumptions, and gives the developer complete control.

## Example Plugins

A few notes

- All plugins live in their own folders in "src/plugins".
- Plugin names should be in follow the format: `/[a-z_]+$`
- JS source should live in a "plugin.js" file (required).
- CSS should live in a "plugin.less" file (optional). It will be bundled at build time.
- Plugins are initialized right before the control is setup. This means that if you want to listen for events on any of the control's elements, you should override the setup() method.

## Boilerplate

```js
FabWindow.define("plugin_name", function (options) {
  // options: plugin-specific options
  // this: FabWindow instance
})
```

## Adding dependencies

```js
FabWindow.define("plugin_name", function (options) {
  this.require("another_plugin")
})
```

## Configuration

Methods should be extended by [wrapping them](https://stackoverflow.com/questions/4578424/javascript-extend-a-function)

```js
const self = this
this.someMethod = (function () {
  const original = self.someMethod
  return function () {
    // do your logic
    return original.apply(this, arguments)
  }
})()
```

## DOM Events

Because all elements for the control are created within the `setup()` method (which is invoked after the plugin initialized) events should be added by overriding the setup method, like so:

````js
FabWindow.define('plugin_name', function(options) {
    const self = this;

    // override the setup method to add an extra `click`  handler
    this.setup = (function() {
    const original = self.setup;
    return function() {
        original.apply(this, arguments);
        this.$control.on('click', 'div', function(e) {
        alert('A div was clicked!');
        });
    };
    })();
    ```
````

## Plugin Usage

For a more detailed description of plugin option formats and how the plugin system works, check out the microplugin documentation.

### Without Options

```js
new FabWindow({
  plugins: ["plugin_a", "plugin_b"],
})
```

## With options

```js
new FabWindow({
  plugins: {
    plugin_a: { pluginAttr: "" },
    plugin_b: {
      /* ... */
    },
  },
})
```
