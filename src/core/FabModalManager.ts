import { FabModal } from "./FabModal";
// Types
import { ModalManagerOptions } from "../types/modal-manager-options";
import { ModalOptions } from "../types/modal-options";

export class FabModalManager {
  public modals: FabModal[];
  public options: ModalManagerOptions;

  // HTML Elements
  public $modalContainer: HTMLDivElement;
  public $bodyElement: HTMLElement;

  /**
   * Instance of FabModalManager
   * See : {@link FabModalManager.defaultOptions}
   */
  constructor(options?: ModalManagerOptions) {
    if (!options || typeof options !== "object") {
      this.options = this.defaultOptions;
    } else {
      this.options = { ...this.defaultOptions, ...options };
    }

    this.modals = [];

    this.$bodyElement = document.body;
    this.$modalContainer = document.createElement("div");
    this.$modalContainer.className = "fab-modal-container";

    this.$bodyElement.appendChild(this.$modalContainer);

    // Binding functions
    this.createModal.bind(this);
    this._initHandlers.bind(this);
  }

  // ## ----------------------------START GETTERS / SETTERS ---------------------------- ## \\

  /**
   * @getter of default options for FabModalManager
   * @returns {ModalManagerOptions}
   */
  get defaultOptions() {
    return {
      limitModal: 5,
      container: true
    };
  }

  // ## ----------------------------END GETTERS / SETTERS ---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  /**
   * @ignore
   */
  private _initHandlers(fabModal: FabModal) {
    fabModal.$el.addEventListener("mousedown", this.setFocused.bind(this));

    fabModal.$el.addEventListener(
      "close",
      (e: Event) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();

        this.destroyModal(fabModal);
      },
      { once: true }
    );
  }

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  /**
   * @function
   * creating new instance of FabModal
   */
  createModal(options: ModalOptions = {}): FabModal {
    options.modal_manager = this;

    const newModal = new FabModal(options);

    return this.addModal(newModal);
  }

  addModal(modal: FabModal) {
    this.modals.push(modal);
    this._initHandlers(modal);

    if (this.options.container) {
      modal.$modalTab = document.createElement('div');
      modal.$modalTab.classList.add('fab-modal-tab');
      modal.$modalTab.innerHTML = modal.options.title || '';
      this.$modalContainer.appendChild(modal.$modalTab);
    }

    return modal;
  }

  /**
   * @function
   * Set the focus to modal
   */
  setFocused(ev: MouseEvent) {
    const fabModalFocused = ev.currentTarget as HTMLElement;
    const focusedModal = this.modals.find(modal => modal.options.id === fabModalFocused?.id || null)

    if (focusedModal?.active === true) return;

    this.modals.forEach((modal: FabModal) => {
      if (modal === focusedModal) {
        focusedModal.$el.classList.add('active');
      } else {
        modal.$el.classList.remove('active');
      }
    });
  }

  /**
   * @function
   * Destroy the modal
   */
  destroyModal(fabModal: FabModal) {
    this.modals.forEach((modal: FabModal, index: number) => {
      if (fabModal === modal) {
        modal.$el.removeEventListener("close", () => { }, { capture: false });
        fabModal.close();
        this.modals.splice(index, 1);
        return;
      }
    });
  }
}
