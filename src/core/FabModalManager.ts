import { FabModal } from "./FabModal";
// Types
import { ModalManagerOptions } from "../types/modal-manager-options";
import { ModalOptions } from "../types/modal-options";

export class FabModalManager {
  public modals: FabModal[];
  public options: ModalManagerOptions;
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
    this._initHandlers.bind(this);
    this.createModal.bind(this);
    this.setFocused.bind(this);
  }

  // ## ----------------------------START GETTERS / SETTERS ---------------------------- ## \\

  /**
   * @getter of default options for FabModalManager
   * @returns {ModalManagerOptions}
   */
  get defaultOptions() {
    return {
      limitModal: 5,
    };
  }

  // ## ----------------------------END GETTERS / SETTERS ---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  /**
   * @ignore
   */
  private _initHandlers(fabModal: FabModal) {
    fabModal.$el.addEventListener("focusin", (e: FocusEvent) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();

      this.setFocused(fabModal);
    });

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
    const fabModal = new FabModal(options);

    this.modals.push(fabModal);
    this._initHandlers(fabModal);

    return fabModal;
  }

  /**
   * @function
   * Set the focus to modal
   */
  setFocused(fabModalFocused: FabModal) {
    let focusedModalIndex = 0;

    this.modals.forEach((modal: FabModal, index: number) => {
      modal.active = false;

      if (modal === fabModalFocused) {
        focusedModalIndex = index;
      }
    });

    fabModalFocused.index = focusedModalIndex.toString();
    fabModalFocused.active = true;
    this.resortModal();
  }

  /**
   * @function
   * Destroy the modal
   */
  destroyModal(fabModal: FabModal) {
    this.modals.forEach((modal: FabModal, index: number) => {
      if (fabModal === modal) {
        modal.$el.removeEventListener("close", () => {}, { capture: false });
        fabModal.close();
        this.modals.splice(index, 1);
        this.resortModal();
        return;
      }
    });
  }

  /**
   * @function
   * Resort all dialog
   */
  resortModal() {
    const startZIndex = "900";
    this.modals.forEach((modal: FabModal, index: number) => {
      modal.index = startZIndex + index;
    });
  }
}
