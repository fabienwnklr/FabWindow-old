"use strict";
(() => {
  // lib/core/FabModalError.ts
  var FabModalError = class extends Error {
    constructor(message) {
      super(message);
      this.name = "FabModal Error";
    }
  };
  var WrongPropertyError = class extends FabModalError {
    constructor(property) {
      super("Wrong property: " + property);
      this.name = "WrongPropertyError";
    }
  };

  // lib/utils/index.ts
  function isMobile() {
    let check = false;
    (function(a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      ))
        check = true;
    })(navigator.userAgent || navigator.vendor);
    return check;
  }
  function validOptions(reference, current) {
    const referenceKeys = Object.keys(reference);
    const currentKeys = Object.keys(current);
    for (let key in currentKeys) {
      if (!(key in referenceKeys)) {
        throw new WrongPropertyError(key);
      }
    }
  }

  // lib/default.ts
  var modalDefaultOptions = {
    id: "fab-modal",
    title: "",
    content: "",
    modal_manager: void 0,
    effects: {
      in: "fade-in",
      out: "fade-out"
    },
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
    onFullScreen: null,
    onRestore: null,
    onResize: null,
    onShow: null,
    onHide: null,
    beforeClose: null,
    onClosing: null,
    onClosed: null
  };

  // lib/FabModal.ts
  var FabModal = class {
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
    $loader;
    $modalTab;
    _$style;
    _disX;
    _disY;
    constructor(options) {
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
      this._removeClassEffect = this._removeClassEffect.bind(this);
      this.toggleFullScreen = this.toggleFullScreen.bind(this);
      this.close = this.close.bind(this);
      this.hide = this.hide.bind(this);
      this.show = this.show.bind(this);
      this.destroy = this.destroy.bind(this);
      this._buildStyle = this._buildStyle.bind(this);
      this._initHandlers = this._initHandlers.bind(this);
      this._fnDown = this._fnDown.bind(this);
      this._fnMove = this._fnMove.bind(this);
      this._fnUp = this._fnUp.bind(this);
      this.createModal();
      this.$bodyElement?.appendChild(this.$el);
      this._buildStyle();
      this._initHandlers();
      if (!this.options.modal_manager) {
        this.show();
      }
    }
    get title() {
      return this.$title.textContent;
    }
    set title(title) {
      if (!title || typeof title !== "string") {
        throw new FabModalError("title must be a string");
      }
      this.$title.textContent = title;
    }
    get content() {
      return this.$body.textContent;
    }
    set content(content) {
      if (!content || typeof content !== "string") {
        throw new FabModalError("content must be a string");
      }
      const isLoader = this.$body.outerHTML !== this.$loader.outerHTML ? false : true;
      this.oldContent = !isLoader ? this.$body.innerHTML : "";
      this.$body.innerHTML = content;
    }
    get index() {
      return this.$el.style.zIndex;
    }
    set index(index) {
      this.$el.style.zIndex = index + "px";
    }
    get modal_manager() {
      return this.options?.modal_manager;
    }
    set modal_manager(obj) {
      this.options.modal_manager = obj;
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
        throw new FabModalError(`modalTab must be an HTMLElement, current type if ${typeof modalTab}`);
      }
      this.$modalTab = modalTab;
    }
    get modalTab() {
      return this.$modalTab;
    }
    _buildStyle() {
      if (document.querySelector("#fab-style") !== null)
        return;
      this._$style = document.createElement("style");
      this._$style.id = `fab-style`;
      this._$style.innerHTML = `
      :root {
        --fab-modal-primary: #415f8b;
      }
      @-webkit-keyframes fadeIn {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
      @-moz-keyframes fadeIn {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
      @-ms-keyframes fadeIn {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
      @-o-keyframes fadeIn {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        90% {
          opacity: 1;
        }
      }
      @-webkit-keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @-moz-keyframes fadeOut {
        0% {
          opacity: 1;
        }
        90% {
          opacity: 0;
        }
      }
      @-ms-keyframes fadeOut {
        0% {
          opacity: 1;
        }
        90% {
          opacity: 0;
        }
      }
      @-o-keyframes fadeOut {
        0% {
          opacity: 1;
        }
        90% {
          opacity: 0;
        }
      }
      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        90% {
          opacity: 0;
        }
      }
      @-webkit-keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @-moz-keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @-ms-keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @-o-keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @-webkit-keyframes comingIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-20px) perspective(600px)
            rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) perspective(600px) rotateX(0);
        }
      }
      @-moz-keyframes comingIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-20px) perspective(600px)
            rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) perspective(600px) rotateX(0);
        }
      }
      @-ms-keyframes comingIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-20px) perspective(600px)
            rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) perspective(600px) rotateX(0);
        }
      }
      @-o-keyframes comingIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-20px) perspective(600px)
            rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) perspective(600px) rotateX(0);
        }
      }
      @keyframes comingIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(-20px) perspective(600px)
            rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0) perspective(600px) rotateX(0);
        }
      }
      @-webkit-keyframes comingOut {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      @-moz-keyframes comingOut {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      @-ms-keyframes comingOut {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      @-o-keyframes comingOut {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      @keyframes comingOut {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.9);
        }
      }
      @-webkit-keyframes slideDown {
        0% {
          opacity: 0;
          transform: scale(1, 0) translateY(-40px);
          transform-origin: center top;
        }
      }
      @-moz-keyframes slideDown {
        0% {
          opacity: 0;
          transform: scale(1, 0) translateY(-40px);
          transform-origin: center top;
        }
      }
      @-ms-keyframes slideDown {
        0% {
          opacity: 0;
          transform: scale(1, 0) translateY(-40px);
          transform-origin: center top;
        }
      }
      @-o-keyframes slideDown {
        0% {
          opacity: 0;
          transform: scale(1, 0) translateY(-40px);
          transform-origin: center top;
        }
      }
      @keyframes slideDown {
        0% {
          opacity: 0;
          transform: scale(1, 0) translateY(-40px);
          transform-origin: center top;
        }
      }
      @-webkit-keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @-moz-keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @-ms-keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @-o-keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideIn {
        0% {
          opacity: 0;
          transform: translateX(50px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @-webkit-keyframes revealIn {
        0% {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 1);
        }
      }
      @-moz-keyframes revealIn {
        0% {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 1);
        }
      }
      @-ms-keyframes revealIn {
        0% {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 1);
        }
      }
      @-o-keyframes revealIn {
        0% {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 1);
        }
      }
      @keyframes revealIn {
        0% {
          opacity: 0;
          transform: scale3d(0.3, 0.3, 1);
        }
      }
      * {
        box-sizing: border-box;
      }

      .transition-all {
        transition: all .3s ease;
      }

      .fade-in {
        -webkit-animation: fadeIn .5s ease;
        -moz-animation: fadeIn .5s ease;
        -ms-animation: fadeIn .5s ease;
        -o-animation: fadeIn .5s ease;
        animation: fadeIn .5s ease;
      }

      .fade-out {
        -webkit-animation: fadeOut .5s ease;
        -moz-animation: fadeOut .5s ease;
        -ms-animation: fadeOut .5s ease;
        -o-animation: fadeOut .5s ease;
        animation: fadeOut .5s ease;
      }

      .loader {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #4e4f50;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translate(-50%, -50%);
        animation: spin 0.6s linear 0s infinite normal;
      }

      .fab-overlay {
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 997;
        background-color: rgba(0, 0, 0, 0.4);
      }

      @media (max-width: 600px) {
        .fab-modal {
          max-height: 100% !important;
        }
      }
      ${typeof this.options.modal_manager !== "undefined" ? `
        .fab-modal-container {
          font-family: monospace;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2rem;
          display: flex;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 997;
        }

        .fab-modal-container .fab-modal-tab {
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;;
          opacity: 0;
          height: 100%;
          padding: 0.2rem 0.5rem;
          background-color: var(--fab-modal-primary);
          color: white;
          margin-right: 0.5rem;
          z-index: 998;
        }

        #${this.options.id} {
          width: ${this.options.width};
          height: ${this.options.height};
          min-width: ${this.options.minWidth};
          min-height: ${this.options.minHeight};
          max-width: ${this.options.maxWidth};
          max-height: ${this.options.maxHeight};
        }
      ` : ``}
      .fab-modal {
        outline: none;
        opacity: 0;
        z-index: ${this.options.zIndex};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        ${typeof this.options.modal_manager === "undefined" ? `
         width: ${this.options.width};
          height: ${this.options.height};
          max-width: ${this.options.maxWidth};
          max-height: ${this.options.maxHeight};
        ` : ""}
        border-radius: 5px;
        display: none;
        overflow: hidden;
        ${this.options.resizable === true ? `
          resize: both;
        ` : ""}
       
        border-bottom: 3px solid var(--fab-modal-primary);
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }
      .fab-modal.show, .fab-overlay.show, .fab-modal-tab.show {
        opacity: 1
      }

      .fab-tab-close {
        border: 0;
        background-color: transparent;
        color: white;
        cursor: pointer;
      }

      .fab-modal.draggable .fab-header  {
        cursor: move;
      }
      .fab-modal .fab-modal-progress-bar {
        position: absolute;
        left: 0;
        top: 0px;
        width: 100%;
        z-index: 1;
      }
      .fab-modal .fab-modal-progress-bar div {
        height: 4px;
        background-color: #fff;
      }
      .fab-modal.fullScreen {
        top: 0!important;
        left: 0!important;
        right: 0!important;
        bottom: 0!important;
        width: 100%!important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        border-radius: 0;
        transform: unset;
      }
      .fab-modal.fullScreen .fab-header {
        border-radius: 0;
        cursor: default!important;
      }
      .fab-modal.fullScreen .fab-content {
        height: 100% !important;
        max-width: 100% !important;
      }
      .fab-modal.active {
        z-index: 1000!important;
      }
      .fab-modal ::-webkit-scrollbar {
        width: 5px;
      }
      .fab-modal ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      .fab-modal ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
      }
      .fab-modal ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
      .fab-modal.iframe {
        border-bottom: none;
        background-color: #000;
      }
      .fab-modal.iframe .fab-header {
        background-color: #000;
      }
      .fab-modal.iframe .fab-content {
        padding: 0;
        color: rgba(255, 255, 255, 0.8);
      }
      .fab-modal .fab-header {
        -webkit-animation: slideDown 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        -moz-animation: slideDown 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        animation: slideDown 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        box-shadow: inset 0 -10px 15px -12px rgba(0, 0, 0, 0.3), 0 0 0px #555;
        cursor: default;
        background-color: var(--fab-modal-primary);
      }
      .fab-modal .fab-header.draggable {
        cursor: move;
      }
      .fab-modal .fab-header .fab-title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 1rem;
        margin: 0;
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.8);
        -webkit-animation: slideIn 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        -moz-animation: slideIn 0.7s cubic-bezier(0.7, 0, 0.3, 1);
        animation: slideIn 0.7s cubic-bezier(0.7, 0, 0.3, 1);
      }
      .fab-modal .fab-header .fab-icons {
        display: flex;
        margin-right: 0.5rem;
        -webkit-animation: revealIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
        -moz-animation: revealIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
        animation: revealIn 1s cubic-bezier(0.16, 0.81, 0.32, 1) both;
      }

      .fab-modal .fab-header .fab-icons button {
        outline: none;
        background: transparent;
        border: transparent;
        width: 25px;
        height: 25px;
        cursor: pointer;
        padding: 0;
        opacity: 0.3;
        transition: opacity 0.2s ease-in;
      }

      .fab-modal .fab-header .fab-icons button:before {
        color: #fff;
        font-weight: 300;
        font-size: 1.2rem;
        font-family: Arial, sans-serif;
      }

      .fab-modal .fab-header .fab-icons button:hover {
        opacity: 1;
      }

      .fab-modal .fab-header .fab-icons .reduce:before {
        content: "\\2012";
      }

      .fab-modal .fab-header .fab-icons .expand:before {
        content: "\\26F6";
      }

      .fab-modal .fab-header .fab-icons .close:before {
        content: "\\2715";
      }
      .fab-modal .fab-content {
        scroll-behavior: smooth;
        position: relative;
        padding: 1rem;
        min-width: 200px;
        min-height: 181px;
        max-width: 100%;
        height: auto;
        line-height: 1.8;
        color: #0a0a0a;
        overflow: auto;
      }
    `;
      document.querySelector("head")?.append(this._$style);
    }
    _removeClassEffect() {
      if (typeof this.options.effects !== "undefined" && typeof this.options.effects.in !== "undefined" && typeof this.options.effects.out !== "undefined") {
        this.$el.classList.remove(this.options.effects.in);
        this.$el.classList.remove(this.options.effects.out);
      }
      this.$el.removeEventListener("animationend", this._removeClassEffect);
    }
    _initHandlers() {
      if (this.options.draggable && !isMobile()) {
        this.$el.classList.add("draggable");
        this._initDrag();
      }
      if (this.options.reducible && typeof this.options.modal_manager !== "undefined") {
      }
      if (this.options.expandable) {
        this.$expand.addEventListener("click", this.toggleFullScreen);
      }
      this.$el.removeEventListener("animationend", this._removeClassEffect);
      this.$el.addEventListener("animationend", this._removeClassEffect);
      this.$close.removeEventListener("click", this.close);
      this.$close.addEventListener("click", this.close);
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
      const limitRight = window.outerWidth - this.$el.clientWidth / 2;
      const limitLeft = this.$el.clientWidth / 2;
      if (left > limitLeft && left < limitRight) {
        this.$el.style.left = `${left}px`;
      }
      this.$el.style.top = `${top}px`;
    }
    _fnUp() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
    createModal() {
      const fullScreen = this.isFullScreen ? " fullScreen" : "";
      if (this.options.overlay === true && this.options.modal_manager == void 0) {
        this.$overlay = document.createElement("div");
        this.$overlay.classList.add("fab-overlay");
        this.$bodyElement.appendChild(this.$overlay);
      }
      this.$el = document.createElement("div");
      this.$el.className = `fab-modal ${this.options.effects?.in} ${fullScreen}`;
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
      this.$body.className = "fab-content fade-in";
      this.$loader = document.createElement("div");
      this.$loader.classList.add("loader");
      if (this.options.content === "" || typeof this.options.content !== "string") {
        this.$body.appendChild(this.$loader);
      } else {
        this.$body.innerHTML = this.options.content;
      }
      if (this.modal_manager)
        this.$el.FabModalManager = this.modal_manager;
      this.$el.FabModal = this;
      this.$el.appendChild(this.$body);
    }
    startLoader() {
      if (this.content === this.$loader.outerHTML)
        return;
      this.content = this.$loader.outerHTML;
    }
    stopLoader() {
      this.$loader.remove();
    }
    restoreOldContent() {
      if (this.oldContent !== "")
        this.$body.innerHTML = this.oldContent;
    }
    show() {
      this.$el.style.display = "block";
      this.$bodyElement.style.overflow = "hidden";
      this.$el.style.display = "block";
      this.$el.style.opacity = "";
      this.$el.classList.add("show");
      if (typeof this.$overlay !== "undefined")
        this.$overlay.classList.add("show");
      if (typeof this.$modalTab !== "undefined")
        this.$modalTab.classList.add("show");
      if (typeof this.options.onShow === "function") {
        this.options.onShow(this);
      }
    }
    hide() {
      this.$el.style.display = "none";
      if (typeof this.options.onHide === "function") {
        this.options.onHide(this);
      }
    }
    toggleFullScreen() {
      if (this.isFullScreen) {
        this._initDrag();
        this.isFullScreen = false;
        this.$bodyElement.style.overflow = "auto";
        this.$el.classList.remove("fullScreen");
        const rmTransition = setTimeout(() => {
          this.$el.classList.remove("transition-all");
          clearTimeout(rmTransition);
        }, 300);
        this.$expand.title = "Restore";
        this.$el.dispatchEvent(new CustomEvent("restore"));
        if (typeof this.options.onRestore === "function") {
          this.options.onRestore(this);
        }
      } else {
        this.$el.removeEventListener("mousedown", this._fnDown);
        this.isFullScreen = true;
        this.$bodyElement.style.overflow = "hidden";
        this.$el.classList.add("transition-all");
        this.$el.classList.add("fullScreen");
        this.$el.dispatchEvent(new CustomEvent("fullScreen"));
        if (typeof this.options.onFullScreen === "function") {
          this.options.onFullScreen(this);
        }
      }
      return this.isFullScreen;
    }
    close() {
      this.$el.dispatchEvent(new CustomEvent("close"));
      this.$el.addEventListener("animationend", this.destroy);
      this.$el.classList.remove("show");
      this.$el.classList.add("fade-out");
      if (typeof this.$overlay !== "undefined") {
        this.$overlay.classList.remove("show");
        this.$overlay.classList.add("fade-out");
      }
      if (typeof this.$modalTab !== "undefined") {
        this.$modalTab.classList.remove("show");
        this.$modalTab.classList.add("fade-out");
      }
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
  window.FabModal = FabModal;
})();
//# sourceMappingURL=FabModal.js.map
