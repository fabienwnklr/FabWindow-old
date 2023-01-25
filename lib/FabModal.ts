// Basic import
import { isMobile } from "./utils"
import { modalDefaultOptions } from "./default"
import { MicroPlugin } from "./contrib/MicroPlugin"
// Types
import type { ModalOptions } from "./types"
import type { FabModalManager } from "./FabModalManager"
// Utils
import { FabModalError } from "./contrib/FabModalError"
import { validOptions } from "./utils/index"
// Style
import "./style/fabmodal.css"

declare global {
  interface Window {
    FabModal: typeof FabModal
  }

  interface HTMLDivElement {
    FabModal: FabModal
    FabModalManager: FabModalManager
  }
}

/**
 * @constructor
 *
 * Instance of FabModal
 */
export class FabModal extends MicroPlugin {
  public options: ModalOptions
  /** @property Boolean called if modal is fullScreen or not */
  public isFullScreen: boolean
  /** @property For stock content before set new content to modal */
  public oldContent: string
  // Html global elements
  protected $bodyElement: HTMLElement
  // Modal html elements
  /** @property overlay html element of simple modal */
  public $overlay: HTMLElement
  /** @property modal html element */
  public $el: HTMLDivElement
  /** @property header modal html element */
  public $header: HTMLElement
  /** @property title modal html element */
  public $title: HTMLElement
  /** @property all buttons modal html element */
  public $icons: HTMLElement
  /** @property recude button modal html element */
  public $reduce: HTMLButtonElement
  /** @property expand button html element */
  public $expand?: HTMLButtonElement
  /** @property close button html element */
  public $close: HTMLButtonElement
  /** @property body content modal html element */
  public $body: HTMLElement
  private $footer?: HTMLDivElement
  /** @property Modal tab element (only if using with FabModalManager) */
  public $modalTab: HTMLElement
  /**@ignore */
  // private _$style: HTMLStyleElement;
  /**@ignore */
  private _disX: number
  /**@ignore */
  private _disY: number

  /**
   * Instance of FabModal
   * @param {ModalOptions} options Object contains options for modal
   * See : {@link modalDefaultOptions}
   * @defaultValue
   * ```javascript
   * const options = {
   *  id: `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}`,
   *   title: "",
   *   content: "",
   *   modal_manager: undefined,
   *   overlay: true,
   *   zIndex: 999,
   *   width: "auto",
   *   height: "auto",
   *   minWidth: "200px",
   *   minHeight: "150px",
   *   maxWidth: "100%",
   *   maxHeight: "100%",
   *   draggable: true,
   *   expandable: true,
   *   reducible: true,
   *
   *   onFullScreen: null,
   *   onRestore: null,
   *   onResize: null,
   *   onShow: null,
   *   onHide: null,
   *   beforeClose: null,
   *   onClose: null,
   * }
   * ```
   */
  constructor(options?: ModalOptions) {
    super()

    if (!options || typeof options !== "object") {
      this.options = modalDefaultOptions
    } else {
      validOptions(modalDefaultOptions, options)
      this.options = { ...modalDefaultOptions, ...options }
    }

    this._disX = 0
    this._disY = 0
    this.isFullScreen = false
    this.oldContent = ""
    this.$bodyElement = document.body

    // Binding
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.close = this.close.bind(this)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)
    this.destroy = this.destroy.bind(this)
    // Private
    // this._buildStyle = this._buildStyle.bind(this);
    this._initHandlers = this._initHandlers.bind(this)
    this._fnDown = this._fnDown.bind(this)
    this._fnMove = this._fnMove.bind(this)
    this._fnUp = this._fnUp.bind(this)

    // Creating modal
    this._createModal()
    // Then insert modal into DOM
    this.$bodyElement?.appendChild(this.$el)
    // this._buildStyle();
    this._initHandlers()

    this.initializePlugins(this.options.plugins)

    if (!this.options.modal_manager) {
      this.show()
    }
  }

  // ## ----------------------------START GETTERS / SETTERS ---------------------------- ## \\

  /**
   * @getter get title of modal
   */
  get title(): string | null {
    return this.$title.textContent
  }

  /**
   * @setter Set title of modal
   */
  set title(title: string | null) {
    if (!title || typeof title !== "string") {
      throw new FabModalError("title must be a string")
    }

    this.$title.textContent = title
  }

  /**
   * @getter Get body content of modal
   */
  get content(): string | null {
    return this.$body.textContent
  }

  /**
   * @setter Set body content of modal
   */
  set content(content: string | null) {
    if (!content || typeof content !== "string") {
      throw new FabModalError("content must be a string")
    }

    this.oldContent = this.$body.outerHTML
    this.$body.innerHTML = content
  }

  /**
   * @setter Set z-index of modal
   */
  get index(): string {
    return this.$el.style.zIndex
  }

  /**
   * @setter Set z-index of modal
   */
  set index(index: string) {
    this.$el.style.zIndex = index + "px"
  }

  /**
   * @getter get modal manager object
   */
  get modal_manager(): FabModalManager | undefined {
    return this.options?.modal_manager
  }

  /**
   * @setter Set modal manager object
   */
  set modal_manager(obj: FabModalManager | undefined) {
    this.options.modal_manager = obj
  }

  /**
   * @setter Set active class to modal
   */
  set active(active: boolean) {
    if (active) {
      this.$el.classList.add("active")

      this.$el.dispatchEvent(new CustomEvent("active"))
    } else {
      this.$el.classList.remove("active")
      this.$el.dispatchEvent(new CustomEvent("inactive"))
    }
  }

  /**
   * @getter Get if modal is active or not
   */
  get active(): boolean {
    return this.$el.classList.contains("active")
  }

  set modalTab(modalTab: HTMLElement) {
    if (!modalTab || modalTab instanceof HTMLElement === false) {
      throw new FabModalError(`modalTab must be an HTMLElement, current type if ${typeof modalTab}`)
    }
    this.$modalTab = modalTab
  }

  get modalTab() {
    return this.$modalTab
  }

  // ## ----------------------------END GETTERS / SETTERS ---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  /**
   * Init handler events
   * @function
   * @ignore
   */
  private _initHandlers() {
    if (this.options.draggable && !isMobile()) {
      this.$el.classList.add("draggable")
      this._initDrag()
    }

    if (this.options.reducible && typeof this.options.modal_manager !== "undefined") {
      this.$reduce.addEventListener("click", this.reduce)
    }

    if (this.options.expandable) {
      this.$expand?.addEventListener("click", this.toggleFullScreen)
    }

    this.$close.removeEventListener("click", this.close)
    this.$close.addEventListener("click", this.close)
  }

  /**
   * @ignore
   */
  private _initDrag() {
    this.$el.addEventListener("mousedown", this._fnDown)
  }

  private _fnDown(ev: MouseEvent) {
    const target = ev.target as HTMLElement

    if (!target?.classList.contains("fab-header") && !target?.classList.contains("fab-title")) return

    this._disX = ev.clientX - this.$el.offsetLeft
    this._disY = ev.clientY - this.$el.offsetTop

    document.onmousemove = this._fnMove.bind(this)
    document.onmouseup = this._fnUp.bind(this)

    return false
  }
  /**
   * @ignore
   */
  private _fnMove(ev: MouseEvent) {
    const left = ev.clientX - this._disX
    const top = ev.clientY - this._disY
    const limitRight = window.innerWidth - this.$el.clientWidth / 2
    const limitLeft = this.$el.clientWidth / 2
    const limitTop = this.$el.clientHeight / 2
    const limitBottom = window.innerHeight - this.$el.clientHeight / 2

    if (left > limitLeft && left < limitRight) {
      this.$el.style.left = `${left}px`
    }

    if (top > limitTop && top < limitBottom) {
      this.$el.style.top = `${top}px`
    }
  }

  /**
   * @ignore
   */
  private _fnUp() {
    document.onmousemove = null
    document.onmouseup = null
  }

  // ## ----------------------------END OF PRIVATE FUNCTION---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PUBLIC API FUNCTION---------------------------- ## \\
  /**
   * @function
   * Create all node elements of modal
   * @note Useless to call this function without calling instance new FabModal()
   */
  _createModal() {
    const fullScreen = this.isFullScreen ? " fullScreen" : ""

    if (this.options.overlay === true && typeof this.options.modal_manager === "undefined") {
      this.$overlay = document.createElement("div")
      this.$overlay.classList.add("fab-overlay")
      this.$bodyElement.appendChild(this.$overlay)
    }

    this.$el = document.createElement("div")
    this.$el.className = `fab-modal${fullScreen}`
    if (typeof this.options.id !== "undefined" && this.options.id !== "") {
      this.$el.id = this.options.id = this.options.id === "fab-modal" ? `fab-modal-${Math.round(new Date().getTime() + Math.random() * 100)}` : this.options.id
    }

    this.$header = document.createElement("div")
    this.$header.className = "fab-header"
    this.$el.appendChild(this.$header)

    this.$title = document.createElement("h1")
    this.$title.className = "fab-title"
    if (typeof this.options.title !== "undefined") {
      this.$title.innerHTML = this.options.title
    }
    this.$header.appendChild(this.$title)

    this.$icons = document.createElement("div")
    this.$icons.className = "fab-icons"
    this.$header.appendChild(this.$icons)

    if (this.options.reducible) {
      this.$reduce = document.createElement("button")
      this.$reduce.className = "reduce"
      this.$reduce.title = "Reduce"
      this.$icons.appendChild(this.$reduce)
    }

    if (this.options.expandable) {
      this.$expand = document.createElement("button")
      this.$expand.className = "expand"
      this.$expand.title = "Expand"
      this.$icons.appendChild(this.$expand)
    }

    this.$close = document.createElement("button")
    this.$close.className = "close"
    this.$close.title = "Close"
    this.$icons.appendChild(this.$close)

    this.$body = document.createElement("div")
    this.$body.className = "fab-content"

    if (typeof this.options.content === "string") {
      this.$body.innerHTML = this.options.content
    } else if (this.options.content instanceof Node) {
      this.$body.append(this.options.content)
    }

    if (typeof this.options.footer !== "undefined") {
      this.$footer = document.createElement("div")
      this.$footer.className = "fab-footer"
      if (typeof this.options.footer === "string") {
        this.$footer.innerHTML = this.options.footer
      } else if (this.options.footer instanceof Node) {
        this.$footer.append(this.options.footer)
      }
    }

    if (this.modal_manager) this.$el.FabModalManager = this.modal_manager
    this.$el.FabModal = this
    this.$el.appendChild(this.$body)

    if (this.$footer) this.$el.appendChild(this.$footer)

    this.$el.FabModal = this
  }

  /**
   * @function
   * Restore old content into modal (the one to save before set new content)
   */
  restoreOldContent() {
    if (this.oldContent !== "") this.$body.innerHTML = this.oldContent
  }

  /**
   * @function
   * show current modal
   */
  show() {
    this.$el.style.display = "block"
    this.$bodyElement.style.overflow = "hidden"
    this.$el.style.display = "block"
    this.$el.style.opacity = ""

    this.$el.classList.add("show")

    if (typeof this.$overlay !== "undefined") this.$overlay.classList.add("show")
    if (typeof this.$modalTab !== "undefined") this.$modalTab.classList.add("show")

    this.$el.dispatchEvent(new CustomEvent("show"))
    if (typeof this.options.onShow === "function") {
      this.options.onShow(this)
    }
  }

  /**
   * @function
   * Hide current modal
   */
  hide() {
    this.$el.style.display = "none"

    this.$el.dispatchEvent(new CustomEvent("hide"))

    if (typeof this.options.onHide === "function") {
      this.options.onHide(this)
    }
  }

  /**
   * @function
   * Toggle fullScreen
   */
  toggleFullScreen(): boolean {
    if (this.isFullScreen) {
      if (this.options.draggable) this._initDrag()
      this.isFullScreen = false
      this.$bodyElement.style.overflow = "auto"
      this.$el.classList.remove("fullScreen")
      if (this.$expand) this.$expand.title = "Restore"

      this.$el.dispatchEvent(new CustomEvent("restore"))
      if (typeof this.options.onRestore === "function") {
        this.options.onRestore(this)
      }
    } else {
      this.$el.removeEventListener("mousedown", this._fnDown)
      this.isFullScreen = true
      this.$bodyElement.style.overflow = "hidden"
      this.$el.classList.add("fullScreen")
      // this.$expand.title = "Réstaurer";

      this.$el.dispatchEvent(new CustomEvent("fullScreen"))
      if (typeof this.options.onFullScreen === "function") {
        this.options.onFullScreen(this)
      }
    }
    return this.isFullScreen
  }

  reduce() {
    // Manage case is out of modal manager, allow reduce simple modal with tab
    if (!this.options.modal_manager) {
      // Build container for tab (migre it into shared file maybe shared.ts)
    }

    this.hide()

    if (typeof this.options.onReduce === "function") {
      this.options.onReduce(this)
    }
  }

  /**
   * @function
   * Close current modal
   */
  close() {
    this.$el.dispatchEvent(new CustomEvent("beforeClose"))

    if (typeof this.options.beforeClose === "function") {
      this.options.beforeClose(this)
    }

    this.$el.classList.remove("show")

    if (typeof this.$overlay !== "undefined") {
      this.$overlay.classList.remove("show")
    }

    if (typeof this.$modalTab !== "undefined") {
      this.$modalTab.classList.remove("show")
    }

    this.destroy()
    this.$el.dispatchEvent(new CustomEvent("close"))
    if (typeof this.options.onClose === "function") {
      this.options.onClose(this)
    }
  }

  /**
   * @function
   * Removing modal from DOM, you cannot retrieve modal after this
   */
  destroy() {
    this.$el.dispatchEvent(new CustomEvent("destroyed"))
    if (typeof this.$overlay !== "undefined") this.$overlay.remove()
    if (typeof this.$modalTab !== "undefined") this.$modalTab.remove()
    this.$el.remove()
  }
}

window.FabModal = FabModal
