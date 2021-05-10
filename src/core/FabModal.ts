// Types
import { ModalOptions } from "../types/modal-options";
import { Utils } from "../utils";
import { FabModalManager } from "./FabModalManager";

export class FabModal {
  public options: ModalOptions;
  public isFullScreen: boolean;
  public oldContent: string;
  // Html global elements
  protected $bodyElement: HTMLElement;
  // Modal html elements
  public $overlay: HTMLElement;
  public $el: HTMLElement;
  public $header: HTMLElement;
  public $title: HTMLElement;
  public $icons: HTMLElement;
  public $reduce: HTMLButtonElement;
  public $expand: HTMLButtonElement;
  public $close: HTMLButtonElement;
  public $body: HTMLElement;
  public $loader: HTMLElement;

  /**@ignore */
  private $style: HTMLStyleElement;
  /**@ignore */
  private disX: number;
  /**@ignore */
  private disY: number;

  /**
   * Instance of FabModal
   * @param {ModalOptions} options Object contains options for modal
   * See : {@link FabModal.defaultOptions}
   * @defaultValue
   * ```javascript
   * const options = {
   *  id: `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}`,
   *   title: "",
   *   content: "",
   *   modal_manager: undefined,
   *   effects: {
   *     in: "fade-in",
   *     out: "fade-out",
   *   },
   *   zIndex: 9999,
   *   width: "auto",
   *   height: "auto",
   *   draggable: true,
   *   expandable: true,
   *   reducible: true,
   *   destroyOnClose: true,
   *
   *   onFullScreen: null,
   *   onRestore: null,
   *   onResize: null,
   *   onShow: null,
   *   onHide: null,
   *   beforeClose: null,
   *   onClosing: null,
   *   onClosed: null,
   * }
   * ```
   */
  constructor(options?: ModalOptions) {
    if (!options || typeof options !== "object") {
      this.options = this.defaultOptions;
    } else {
      this.options = { ...this.defaultOptions, ...options };
    }

    this.disX = 0;
    this.disY = 0;
    this.isFullScreen = false;
    this.oldContent = "";
    this.$bodyElement = document.body;

    // Binding
    this._removeClassEffect = this._removeClassEffect.bind(this);
    this._buildStyle = this._buildStyle.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.close = this.close.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this._initHandlers = this._initHandlers.bind(this);
    this.destroy = this.destroy.bind(this);
    this.safeDestroy = this.safeDestroy.bind(this);

    // Creating modal
    this.createModal();
    // Then insert modal into DOM
    this.$bodyElement?.appendChild(this.$el);
    this._buildStyle();
    this._initHandlers();
    this.show();
  }

  // ## ----------------------------START GETTERS / SETTERS ---------------------------- ## \\

  /**
   * @getter Return object with default value for modal
   */
  get defaultOptions() {
    return {
      id: `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}`,
      title: "",
      content: "",
      modal_manager: undefined,
      effects: {
        in: "fade-in",
        out: "fade-out",
      },
      overlay: true,
      zIndex: 9999,
      width: "auto",
      height: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      draggable: true,
      expandable: true,
      reducible: true,
      destroyOnClose: true,

      onFullScreen: null,
      onRestore: null,
      onResize: null,
      onShow: null,
      onHide: null,
      beforeClose: null,
      onClosing: null,
      onClosed: null,
    };
  }

  /**
   * @getter get title of modal
   */
  get title(): string | null {
    return this.$title.textContent;
  }

  /**
   * @setter Set title of modal
   */
  set title(title: string | null) {
    this.$title.textContent = title;
  }

  /**
   * @getter Get body content of modal
   */
  get content(): string | null {
    return this.$body.textContent;
  }

  /**
   * @setter Set body content of modal
   */
  set content(content: string | null) {
    if (content !== "" && typeof content === "string") {
      const isLoader =
        this.$body.outerHTML !== this.$loader.outerHTML ? false : true;
      this.oldContent = !isLoader ? this.$body.innerHTML : "";
      this.$body.innerHTML = content;
    }
  }

  /**
   * @setter Set z-index of modal
   */
  get index(): string {
    return this.$el.style.zIndex;
  }

  /**
   * @setter Set z-index of modal
   */
  set index(index: string) {
    this.$el.style.zIndex = index + "px";
  }

  /**
   * @getter get modal manager object
   */
  get modal_manager(): FabModalManager | undefined {
    return this.options?.modal_manager;
  }

  /**
   * @setter Set modal manager object
   */
  set modal_manager(obj: FabModalManager | undefined) {
    this.options.modal_manager = obj;
  }

  /**
   * @setter Set active class to modal
   */
  set active(active: boolean) {
    if (active) {
      this.$el.classList.add("active");

      this.$el.dispatchEvent(new CustomEvent("active"));
    } else {
      this.$el.classList.remove("active");
      this.$el.dispatchEvent(new CustomEvent("inactive"));
    }
  }

  /**
   * @getter Get if modal is active or not
   */
  get active(): boolean {
    return this.$el.classList.contains("active");
  }

  // ## ----------------------------END GETTERS / SETTERS ---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  /**
   * Build FabModal CSS
   * @function
   * @ignore
   */
  private _buildStyle() {
    if (document.querySelector("#fab-style") !== null) return;

    // Building style
    this.$style = document.createElement("style");
    this.$style.id = `fab-style`;
    // CSS
    this.$style.innerHTML = `
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
        -webkit-animation: fadeIn 1s ease;
        -moz-animation: fadeIn 1s ease;
        -ms-animation: fadeIn 1s ease;
        -o-animation: fadeIn 1s ease;
        animation: fadeIn 1s ease;
      }

      .fade-out {
        -webkit-animation: fadeOut 1s ease;
        -moz-animation: fadeOut 1s ease;
        -ms-animation: fadeOut 1s ease;
        -o-animation: fadeOut 1s ease;
        animation: fadeOut 1s ease;
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
        width: ${this.options.width};
        height: ${this.options.height}
        max-width: ${this.options.maxWidth};
        max-height: ${this.options.maxHeight};
        border-radius: 5px;
        display: none;
        overflow: hidden;
        border-bottom: 3px solid #415f8b;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
      .fab-modal .active {
        z-index: 1000;
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
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        position: relative;
        box-shadow: inset 0 -10px 15px -12px rgba(0, 0, 0, 0.3), 0 0 0px #555;
        cursor: default;
        background-color: #415f8b;
      }
      .fab-modal .fab-header.draggable {
        cursor: move;
      }
      .fab-modal .fab-header .fab-title {
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
      }
      .fab-modal .fab-content.hasScroll {
        overflow-x: hidden;
        overflow-y: auto;
      }
    `;

    // insert style in DOM
    document.querySelector("head")?.append(this.$style);
  }

  /**
   * Removing class effect
   * @function
   * @ignore
   */
  private _removeClassEffect() {
    if (
      typeof this.options.effects !== "undefined" &&
      typeof this.options.effects.in !== "undefined" &&
      typeof this.options.effects.out !== "undefined"
    ) {
      this.$el.classList.remove(this.options.effects.in);
      this.$el.classList.remove(this.options.effects.out);
    }
    this.$el.removeEventListener("animationend", this._removeClassEffect);
  }

  /**
   * Init handler events
   * @function
   * @ignore
   */
  private _initHandlers() {
    if (this.options.draggable && !Utils.isMobile()) {
      this.$el.classList.add("draggable");
      this._initDrag();
    }

    if (this.options.reducible) {
      // this.$reduce.addEventListener("click", this.reduce);
    }

    if (this.options.expandable) {
      this.$expand.addEventListener("click", this.toggleFullScreen);
    }

    this.$el.removeEventListener("animationend", this._removeClassEffect);
    this.$el.addEventListener("animationend", this._removeClassEffect);

    this.$close.removeEventListener("click", this.close);
    this.$close.addEventListener("click", this.close);
  }

  /**
   * @ignore
   */
  private _initDrag() {
    this.$el.onmousedown = (ev) => {
      this.disX = ev.clientX - this.$el.offsetLeft;
      this.disY = ev.clientY - this.$el.offsetTop;

      document.onmousemove = this._fnMove.bind(this);
      document.onmouseup = this._fnUp.bind(this);

      return false;
    };
  }

  /**
   * @ignore
   */
  private _fnMove(ev: MouseEvent) {
    this.$el.style.left = ev.clientX - this.disX + "px";
    this.$el.style.top = ev.clientY - this.disY + "px";
  }

  /**
   * @ignore
   */
  private _fnUp() {
    document.onmousemove = null;
    document.onmouseup = null;
  }

  // ## ----------------------------END OF PRIVATE FUNCTION---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PUBLIC FUNCTION---------------------------- ## \\
  /**
   * @function
   * Create all node elements of modal
   * @note Useless to call this function without calling instance new FabModal()
   */
  createModal() {
    const fullScreen = this.isFullScreen ? " fullScreen" : "";

    if (this.options.overlay === true && this.options.modal_manager == undefined) {
      this.$overlay = document.createElement('div');
      this.$overlay.classList.add('fab-overlay');
      this.$bodyElement.appendChild(this.$overlay);
    }

    this.$el = document.createElement("div");
    this.$el.setAttribute("tabindex", "-1");
    this.$el.className = `fab-modal ${this.options.effects?.in} ${fullScreen}`;
    if (typeof this.options.id !== "undefined") {
      this.$el.id = this.options.id;
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

    if (
      this.options.content === "" ||
      typeof this.options.content !== "string"
    ) {
      this.$body.appendChild(this.$loader);
    } else {
      this.$body.innerHTML = this.options.content;
    }

    this.$el.appendChild(this.$body);
  }

  /**
   * @function
   * Starting loader into modal
   */
  startLoader() {
    if (this.content === this.$loader.outerHTML) return;
    this.content = this.$loader.outerHTML;
  }

  /**
   * @function
   * Stop loader into modal
   */
  stopLoader() {
    this.$loader.remove();
  }

  /**
   * @function
   * Restore old content into modal (the one to save before set new content)
   */
  restoreOldContent() {
    if (this.oldContent !== "") this.$body.innerHTML = this.oldContent;
  }

  /**
   * @function
   * show current modal
   */
  show() {
    this.$el.style.display = "block";
    this.$bodyElement!.style.overflow = "hidden";
    this.$el.style.display = "block";
    this.$el.style.opacity = "1";

    if (typeof this.$overlay !== 'undefined') this.$overlay.style.opacity = "1";

    if (typeof this.options.onShow === "function") {
      this.options.onShow(this);
    }
  }

  /**
   * @function
   * Hide current modal
   */
  hide() {
    this.$el.style.display = "none";

    if (typeof this.options.onHide === "function") {
      this.options.onHide(this);
    }
  }

  /**
   * @function
   * Toggle fullScreen
   */
  toggleFullScreen(): boolean {
    if (this.isFullScreen) {
      this._initDrag();
      this.isFullScreen = false;
      this.$bodyElement.style.overflow = "auto";
      this.$el.classList.remove("fullScreen");
      
      const rmTransition = setTimeout(() => {
        this.$el.classList.remove("transition-all");
        clearTimeout(rmTransition);
      }, 300);
      // this.$expand.title = "Agrandir";

      this.$el.dispatchEvent(new CustomEvent("restore"));
      if (typeof this.options.onRestore === "function") {
        this.options.onRestore(this);
      }
    } else {
      this.$el.onmousedown = null;
      this.isFullScreen = true;
      this.$bodyElement.style.overflow = "hidden";
      this.$el.classList.add("transition-all");
      this.$el.classList.add("fullScreen");
      // this.$expand.title = "Réstaurer";

      this.$el.dispatchEvent(new CustomEvent("fullScreen"));
      if (typeof this.options.onFullScreen === "function") {
        this.options.onFullScreen(this);
      }
    }
    return this.isFullScreen;
  }

  /**
   * @function
   * Closing current modal
   */
  close() {
    this.$el.dispatchEvent(new CustomEvent("close"));

    if (this.options.destroyOnClose === true) {
      this.$el.addEventListener("animationend", this.destroy);
    } else {
      this.$el.addEventListener("animationend", this.safeDestroy);
    }

    this.$el.style.opacity = "";
    this.$el.classList.add("fade-out");
    this.$overlay.style.opacity = "";
    this.$overlay.classList.add("fade-out");
  }

  /**
   * @function
   * Removing modal from DOM, you cannot retrieve modal after this
   */
  destroy() {
    this.$el.dispatchEvent(new CustomEvent("destroyed"));
    this.$overlay.remove();
    this.$el.remove();
  }

  /**
   * @function
   * Only hidding modal in the DOM you can re-display modal after with function show
   */
  safeDestroy() {
    this.$el.dispatchEvent(new CustomEvent("safeDestroyed"));
    this.$overlay.style.display = "none";
    this.$el.style.display = "none";

    if (
      typeof this.options.effects !== "undefined" &&
      typeof this.options.effects.out !== "undefined"
    ) {
      this.$el.classList.remove(this.options.effects.out);
      this.$overlay.classList.remove(this.options.effects.out);
    }
    this.$el.removeEventListener("animationend", this.safeDestroy);
  }
}
