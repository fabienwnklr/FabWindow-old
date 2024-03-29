/**
 * FabWindow (vundefined)
 * https://netlify.fabwindow.dev
 *
 * Copyright (c) 2021-2023 Fabien Winkler & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Fabien Winkler <fabienwinkler@outlook.fr>
 */

"use strict";
var FabWindow = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/FabWindow.ts
  var FabWindow_exports = {};
  __export(FabWindow_exports, {
    FabWindow: () => FabWindow
  });

  // src/contrib/FabWindowError.ts
  var FabWindowError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "FabWindow Error";
    }
  };
  var WrongPropertyError = class extends FabWindowError {
    constructor(property) {
      super("Wrong property: " + property);
      this.name = "WrongPropertyError";
    }
  };

  // src/helpers/index.ts
  function isMobile() {
    let check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substring(0, 4)
      ))
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  }
  function validOptions(reference, current) {
    const referenceKeys = Object.keys(reference);
    const currentKeys = Object.keys(current);
    for (const key in currentKeys) {
      if (!(key in referenceKeys)) {
        throw new WrongPropertyError(key);
      }
    }
  }

  // src/default.ts
  var modalDefaultOptions = {
    id: "fab-modal",
    title: "",
    content: "",
    classes: void 0,
    disableOverflow: true,
    closeOnEscapce: true,
    overlay: true,
    zIndex: 999,
    width: "auto",
    height: "auto",
    minWidth: "200px",
    minHeight: "150px",
    maxWidth: "100%",
    maxHeight: "100%",
    draggable: false,
    expandable: false,
    reducible: false,
    resizable: false,
    plugins: {},
    onReduce: void 0,
    onFullScreen: void 0,
    restoreFullScreen: void 0,
    onRestore: void 0,
    onResize: void 0,
    onShow: void 0,
    onHide: void 0,
    beforeClose: void 0,
    onClose: void 0
  };

  // src/contrib/MicroEvent.ts
  function forEvents(events, callback) {
    events.split(/\s+/).forEach((event) => {
      callback(event);
    });
  }
  var MicroEvent = class {
    _events;
    constructor() {
      this._events = {};
    }
    on(events, fct) {
      forEvents(events, (event) => {
        const event_array = this._events[event] || [];
        event_array.push(fct);
        this._events[event] = event_array;
      });
    }
    off(events, fct) {
      var n = arguments.length;
      if (n === 0) {
        this._events = {};
        return;
      }
      forEvents(events, (event) => {
        if (n === 1) {
          delete this._events[event];
          return;
        }
        const event_array = this._events[event];
        if (event_array === void 0)
          return;
        event_array.splice(event_array.indexOf(fct), 1);
        this._events[event] = event_array;
      });
    }
    trigger(events, ...args) {
      var self2 = this;
      forEvents(events, (event) => {
        args[0].$el.dispatchEvent(new CustomEvent(event));
        const event_array = self2._events[event];
        if (event_array === void 0)
          return;
        event_array.forEach((fct) => {
          fct.apply(self2, args);
        });
      });
    }
  };

  // src/contrib/MicroPlugin.ts
  var MicroPlugin = class extends MicroEvent {
    plugins = {
      names: [],
      settings: {},
      requested: {},
      loaded: {}
    };
    initializePlugins(plugins) {
      if (typeof plugins === "undefined") {
        return;
      }
      let i, n, key;
      const queue = [];
      if (Array.isArray(plugins)) {
        for (i = 0, n = plugins.length; i < n; i++) {
          if (typeof plugins[i] === "string") {
            queue.push(plugins[i]);
          } else {
            this.plugins.settings[plugins[i].name] = plugins[i].options;
            queue.push(plugins[i].name);
          }
        }
      } else if (plugins) {
        for (key in plugins) {
          if (Object.prototype.hasOwnProperty.call(plugins, key)) {
            this.plugins.settings[key] = plugins[key];
            queue.push(key);
          }
        }
      }
      while (queue.length) {
        self.require(queue.shift());
      }
    }
    loadPlugin(name) {
      const plugins = this.plugins;
      const plugin = this.plugins[name];
      if (!Object.prototype.hasOwnProperty.call(this.plugins, name)) {
        throw new Error('Unable to find "' + name + '" plugin');
      }
      plugins.requested[name] = true;
      plugins.loaded[name] = plugin.fn.apply(this, [this.plugins.settings[name] || {}]);
      plugins.names.push(name);
    }
    require(name) {
      const plugins = this.plugins;
      if (!Object.prototype.hasOwnProperty.call(this.plugins.loaded, name)) {
        if (plugins.requested[name]) {
          throw new Error('Plugin has circular dependency ("' + name + '")');
        }
        this.loadPlugin(name);
      }
      return plugins.loaded[name];
    }
    define(name, fn) {
      this.plugins[name] = {
        name,
        fn
      };
    }
  };

  // src/FabWindow.ts
  var FabWindow = class extends MicroPlugin {
    options;
    isFullScreen;
    oldContent;
    $bodyElement;
    $overlay;
    $el;
    $header;
    $title;
    $icons;
    $reduce;
    $expand;
    $close;
    $body;
    $footer;
    $modalTab;
    _disX;
    _disY;
    constructor(options) {
      super();
      if (!options || typeof options !== "object") {
        this.options = modalDefaultOptions;
      } else {
        validOptions(modalDefaultOptions, options);
        this.options = { ...modalDefaultOptions, ...options };
      }
      this._disX = 0;
      this._disY = 0;
      this.isFullScreen = false;
      this.oldContent = "";
      this.$bodyElement = document.body;
      this.toggleFullScreen = this.toggleFullScreen.bind(this);
      this.close = this.close.bind(this);
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.destroy = this.destroy.bind(this);
      this._initHandlers = this._initHandlers.bind(this);
      this._fnDown = this._fnDown.bind(this);
      this._fnMove = this._fnMove.bind(this);
      this._fnUp = this._fnUp.bind(this);
      this._createModal();
      this.$bodyElement?.appendChild(this.$el);
      this._initHandlers();
      this._setupCallbacks();
      this.initializePlugins(this.options.plugins);
      this.show();
    }
    get title() {
      return this.$title.textContent;
    }
    set title(title) {
      if (!title || typeof title !== "string") {
        throw new FabWindowError("title must be a string");
      }
      this.$title.textContent = title;
    }
    get content() {
      return this.$body.textContent;
    }
    set content(content) {
      if (!content || typeof content !== "string") {
        throw new FabWindowError("content must be a string");
      }
      this.oldContent = this.$body.outerHTML;
      this.$body.innerHTML = content;
    }
    get index() {
      return this.$el.style.zIndex;
    }
    set index(index) {
      this.$el.style.zIndex = index + "px";
    }
    set active(active) {
      if (active) {
        this.$el.classList.add("active");
        this.$el.dispatchEvent(new CustomEvent("active"));
      } else {
        this.$el.classList.remove("active");
        this.$el.dispatchEvent(new CustomEvent("inactive"));
      }
    }
    get active() {
      return this.$el.classList.contains("active");
    }
    set modalTab(modalTab) {
      if (!modalTab || modalTab instanceof HTMLElement === false) {
        throw new FabWindowError(`modalTab must be an HTMLElement, current type if ${typeof modalTab}`);
      }
      this.$modalTab = modalTab;
    }
    get modalTab() {
      return this.$modalTab;
    }
    _initHandlers() {
      if (this.options.draggable && !isMobile()) {
        this.$el.classList.add("draggable");
        this._initDrag();
      }
      if (this.options.reducible) {
        this.$reduce.addEventListener("click", this.reduce);
      }
      if (this.options.expandable) {
        this.$expand?.addEventListener("click", this.toggleFullScreen);
      }
      this.$close.removeEventListener("click", this.close);
      this.$close.addEventListener("click", this.close);
      if (this.options.closeOnEscapce) {
        document.addEventListener("keydown", this.close);
      }
    }
    _initDrag() {
      this.$el.addEventListener("mousedown", this._fnDown);
    }
    _fnDown(ev) {
      const target = ev.target;
      if (!target?.classList.contains("fab-header") && !target?.classList.contains("fab-title"))
        return;
      this._disX = ev.clientX - this.$el.offsetLeft;
      this._disY = ev.clientY - this.$el.offsetTop;
      document.onmousemove = this._fnMove.bind(this);
      document.onmouseup = this._fnUp.bind(this);
      return false;
    }
    _fnMove(ev) {
      const left = ev.clientX - this._disX;
      const top = ev.clientY - this._disY;
      const limitRight = window.innerWidth - this.$el.clientWidth / 2;
      const limitLeft = this.$el.clientWidth / 2;
      const limitTop = this.$el.clientHeight / 2;
      const limitBottom = window.innerHeight - this.$el.clientHeight / 2;
      if (left > limitLeft && left < limitRight) {
        this.$el.style.left = `${left}px`;
      }
      if (top > limitTop && top < limitBottom) {
        this.$el.style.top = `${top}px`;
      }
    }
    _fnUp() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
    _setupCallbacks() {
      let key, fn;
      const callbacks = {
        reduce: "onReduce",
        fullscreen: "onFullScreen",
        restore_fullscreen: "restoreFullScreen",
        restore: "onRestore",
        resize: "onResize",
        show: "onShow",
        hide: "onHide",
        before_close: "beforeClose",
        close: "onClose"
      };
      for (key in callbacks) {
        fn = this.options[callbacks[key]];
        if (fn && fn instanceof Function) {
          this.on(key, fn);
        }
      }
    }
    _createModal() {
      const fullScreen = this.isFullScreen ? " fullScreen" : "";
      if (this.options.overlay === true) {
        this.$overlay = document.createElement("div");
        this.$overlay.classList.add("fab-overlay");
        this.$bodyElement.appendChild(this.$overlay);
      }
      this.$el = document.createElement("div");
      this.$el.className = `fab-modal${fullScreen}`;
      this.$el.dataset.fw = "true";
      if (typeof this.options.id !== "undefined" && this.options.id !== "") {
        this.$el.id = this.options.id = this.options.id === "fab-modal" ? `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}` : this.options.id;
      }
      this.$header = document.createElement("div");
      this.$header.className = "fab-header";
      this.$el.appendChild(this.$header);
      this.$title = document.createElement("h1");
      this.$title.className = "fab-title";
      if (typeof this.options.title !== "undefined") {
        this.$title.innerHTML = this.options.title;
      }
      this.$header.appendChild(this.$title);
      this.$icons = document.createElement("div");
      this.$icons.className = "fab-icons";
      this.$header.appendChild(this.$icons);
      if (this.options.reducible) {
        this.$reduce = document.createElement("button");
        this.$reduce.className = "reduce";
        this.$reduce.title = "Reduce";
        this.$icons.appendChild(this.$reduce);
      }
      if (this.options.expandable) {
        this.$expand = document.createElement("button");
        this.$expand.className = "expand";
        this.$expand.title = "Expand";
        this.$icons.appendChild(this.$expand);
      }
      this.$close = document.createElement("button");
      this.$close.className = "close";
      this.$close.title = "Close";
      this.$icons.appendChild(this.$close);
      this.$body = document.createElement("div");
      this.$body.className = "fab-content";
      if (typeof this.options.content === "string") {
        this.$body.innerHTML = this.options.content;
      } else if (this.options.content instanceof Node) {
        this.$body.append(this.options.content);
      }
      if (typeof this.options.footer !== "undefined") {
        this.$footer = document.createElement("div");
        this.$footer.className = "fab-footer";
        if (typeof this.options.footer === "string") {
          this.$footer.innerHTML = this.options.footer;
        } else if (this.options.footer instanceof Node) {
          this.$footer.append(this.options.footer);
        }
      }
      this.$el.FabWindow = this;
      this.$el.appendChild(this.$body);
      if (this.$footer)
        this.$el.appendChild(this.$footer);
      this.$el.FabWindow = this;
    }
    restoreOldContent() {
      if (this.oldContent !== "")
        this.$body.innerHTML = this.oldContent;
    }
    show() {
      this.$el.style.display = "block";
      this.$el.style.opacity = "";
      if (this.options.disableOverflow) {
        this.$bodyElement.style.overflow = "hidden";
      }
      this.$el.classList.add("show");
      if (typeof this.$overlay !== "undefined")
        this.$overlay.classList.add("show");
      if (typeof this.$modalTab !== "undefined")
        this.$modalTab.classList.add("show");
      this.$el.dispatchEvent(new CustomEvent("show"));
      this.trigger("show", this);
    }
    hide() {
      this.$el.style.display = "none";
      this.$overlay.classList.remove("show");
      if (this.$overlay) {
        this.$overlay.style.display = "none";
        this.$overlay.classList.remove("show");
      }
      this.trigger("hide", this);
    }
    toggleFullScreen() {
      if (this.isFullScreen) {
        if (this.options.draggable)
          this._initDrag();
        this.isFullScreen = false;
        this.$bodyElement.style.overflow = "auto";
        this.$el.classList.remove("fullScreen");
        if (this.$expand)
          this.$expand.title = "Restore";
        this.trigger("restoreFullScreen", this);
      } else {
        this.$el.removeEventListener("mousedown", this._fnDown);
        this.isFullScreen = true;
        this.$bodyElement.style.overflow = "hidden";
        this.$el.classList.add("fullScreen");
        this.trigger("fullScreen", this);
      }
      return this.isFullScreen;
    }
    restore() {
    }
    reduce() {
      this.hide();
      this.trigger("reduce", this);
    }
    close(event) {
      if (event && event instanceof KeyboardEvent) {
        if (event.key !== "Escape") {
          return;
        }
      }
      this.trigger("before_close", this);
      this.$el.classList.remove("show");
      if (typeof this.$overlay !== "undefined") {
        this.$overlay.classList.remove("show");
      }
      if (typeof this.$modalTab !== "undefined") {
        this.$modalTab.classList.remove("show");
      }
      this.destroy();
      this.trigger("close", this);
    }
    destroy() {
      this.$el.dispatchEvent(new CustomEvent("destroyed"));
      if (typeof this.$overlay !== "undefined")
        this.$overlay.remove();
      if (typeof this.$modalTab !== "undefined")
        this.$modalTab.remove();
      this.$el.remove();
    }
  };
  return __toCommonJS(FabWindow_exports);
})();
