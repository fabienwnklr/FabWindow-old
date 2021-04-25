import { ModalOptions } from "../types/modal-options";

export class FabModal {
  public options: ModalOptions;
  public isFullScreen: boolean;
  // Html elements
  public $bodyElement: HTMLBodyElement | null = null;
  // Modal html elements
  public $el: HTMLDivElement;
  public $header: HTMLDivElement;
  public $title: HTMLDivElement;
  public $icons: HTMLDivElement;
  public $maximize: HTMLButtonElement;
  public $close: HTMLButtonElement;
  public $body: HTMLDivElement;

  private $style: HTMLStyleElement;

  /**
   *
   * @param {object} options object of options (see defaultOptions function)
   */
  constructor(options?: ModalOptions) {
    if (!options || typeof options !== "object") {
      this.options = this.defaultOptions;
    } else {
      this.options = { ...this.defaultOptions, ...options };
    }
    this.isFullScreen = false;
    this.$bodyElement = document.querySelector("body");

    // Creating modal
    this.$el = this.createModal();
    // Then insert modal into DOM
    this.$bodyElement?.appendChild(this.$el);
    this.buildStyle();
    this.initHandlers();
    this.show();
  }

  /**
   * @function
   * @returns {object} Returns default object of options;
   */
  get defaultOptions() {
    return {
      id: `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}`,
      effects: {
        in: "coming-in", // Also fade-in
        out: "coming-out", // Also fade-out
      },
      zIndex: 9999,
      width: "800px",
      height: "auto",
      maximizable: false,
      minimizable: false,
      title: "",
      // Custom | default content
      loader: '<div class="loader"></div>',
      content: '<div class="loader"></div>',
      // function
      onFullscreen: null,
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
   * Create all node elements of modal
   * @function
   * @returns {FabModal} Modal node element
   * @note Useless to call this function without calling instance new FabModal()
   */
  createModal() {
    const fullScreen = this.isFullScreen ? " fullScreen" : "";

    this.$el = document.createElement("div");
    this.$el.className = `fab-modal ${this.options.effects.in} ${fullScreen}`;
    this.$el.id = this.options.id;

    this.$header = document.createElement("div");
    this.$header.className = "fab-header";
    this.$el.appendChild(this.$header);

    this.$title = document.createElement("h1");
    this.$title.className = "fab-title";
    this.$title.innerHTML = this.options.title;
    this.$header.appendChild(this.$title);

    this.$icons = document.createElement("div");
    this.$icons.className = "fab-icons";
    this.$header.appendChild(this.$icons);

    if (this.options.maximizable) {
      this.$maximize = document.createElement("button");
      this.$maximize.className = "maximize";
      this.$maximize.title = "Agrandir";
      this.$icons.appendChild(this.$maximize);
    }

    this.$close = document.createElement("button");
    this.$close.className = "close";
    this.$close.title = "Fermer";
    this.$close.textContent = "Fermer";
    this.$icons.appendChild(this.$close);

    this.$body = document.createElement("div");
    this.$body.className = "fab-content fade-in";

    this.$el.appendChild(this.$body);

    return this.$el;
  }

  /**
   * Build FabModal CSS
   * @function
   * @ignore
   */
  buildStyle() {
    if (document.querySelector("#fab-style") !== null) return;

    const width =
      typeof this.options.width === "number"
        ? `${this.options.width}px`
        : this.options.width;
    const height =
      typeof this.options.height === "number"
        ? `${this.options.height}px`
        : this.options.height;

    // Building style
    this.$style = document.createElement("style");
    this.$style.id = `fab-style`;
    // CSS
    this.$style.innerHTML = `
      * {
        box-sizing: border-box;
      }

      .fade-in {
      }

      .fade-out {
      }

      .coming-in {
      }

      .coming-out {
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

      .fab-modal {
        width: ${width};
        height: ${height};
        opacity: 0;
        z-index: 9999;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        transition: margin-top 0.3s ease, height 0.3s ease;
        transform: translateZ(0);
        box-sizing: border-box;
        border-radius: 5px;
        display: none;
        overflow: hidden;
        border-bottom: 1px solid #d8d8d8;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        transition: all 0.2s ease;
      }

      .fab-modal.active {
        z-index: ${this.options.zIndex + 1};
      }

      .fab-modal.fullScreen {
        top: 0;
        left: 0;
        width: 100%;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100% !important;
        border-radius: 0;
      }

      .fab-modal .fab-header {
        border-radius: 0;
      }

      .fab-modal::-webkit-scrollbar {
        width: 5px;
      }

      .fab-modal::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .fab-modal::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      .fab-modal .fab-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        position: relative;
        box-shadow: inset 0 -10px 15px -12px rgba(0, 0, 0, 0.3), 0 0 0px #555;
        padding: 1rem;
        cursor: default;
        background-color: $primary;
      }

      .fab-modal .fab-header.draggable {
        cursor: move;
      }

      .fab-modal .fab-title {
        margin: 0;
        font-size: 1.3rem;
        color: rgba(255, 255, 255, 0.8);
      }

      .fab-modal .fab-icons {
        display: flex;
      }

      .fab-modal .fab-icons button {
        outline: none;
        background: transparent;
        border: transparent;
      }

      .fab-modal .fab-icons button:nth-child(1n) {
        margin-right: 1rem;
      }

      .fab-modal .fab-icons button:last-child {
        margin-right: 0;
      }

      .fab-modal .fab-icons .reduce {
        background-image: url(../icon/minus.svg);
        width: 16px;
        height: 16px;
        opacity: 0.3;
        cursor: pointer;
        transition: opacity 0.2s ease-in;
      }

      .fab-modal .fab-icons .reduce:hover {
        opacity: 1;
      }

      .fab-modal .fab-icons .maximize {
        background: url(../icon/expand.svg) no-repeat center
          rgba(255, 255, 255, 0.8);
        width: 25px;
        height: 25px;
        opacity: 0.3;
        cursor: pointer;
        border-radius: 50%;
        transition: opacity 0.2s ease-in;
        margin-right: 0.5rem;
        background-size: 16px;
        background-origin: content-box;
      }

      .fab-modal .fab-icons .maximize:hover {
        opacity: 1;
      }

      .fab-modal .fab-icons .close {
        border-radius: 50%;
        width: 25px;
        height: 25px;
        cursor: pointer;
        opacity: 0.3;
        transition: transform 0.2s ease-in, opacity 0.2s ease-in;
        text-indent: -9999px;
        border: none;
        background: url(../icon/close.svg) no-repeat center
          rgba(255, 255, 255, 0.8);
        opacity: 0.3;
        background-size: 16px;
        background-origin: content-box;
      }

      .fab-modal .fab-icons .close:hover {
        opacity: 1;
        transform: rotate(180deg);
      }
    `;

    // insert style in DOM
    document.querySelector("head")?.append(this.$style);
  }

  /**
   * show curernt modal
   * @function
   */
  show() {
    this.$el.style.display = "";

    if (typeof this.options.onShow === "function") {
      this.options.onShow(this);
    }
  }

  /**
   * Hide current modal
   * @function
   */
  hide() {
    this.$el.style.display = "none";

    if (typeof this.options.onHide === "function") {
      this.options.onHide(this);
    }
  }

  /**
   * set body content of modal
   * @function
   * @param {string | null} content
   */
  setContent(content: string) {
    this.$body.innerHTML = content;
  }

  initHandlers() {}
}
