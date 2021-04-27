import { FabModal } from "./FabModal";
// Types
import { ModalManagerOptions } from "../types/modal-manager-options";
import { ModalOptions } from "../types/modal-options";

export class FabModalManager {
  public modals: FabModal[];
  public options: ModalManagerOptions;
  public $modalContainer: HTMLDivElement;
  public $bodyElement: HTMLElement;

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

  get defaultOptions() {
    return {};
  }

  // ## ----------------------------END GETTERS / SETTERS ---------------------------- ## \\

  // ______________________________________________________________________________________ \\

  // ## ----------------------------START PRIVATE FUNCTION---------------------------- ## \\

  _initHandlers(fabModal: FabModal) {
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
   *
   * @param {object} options
   * @returns {FabModal}
   */
  createModal(options: ModalOptions) {
    const fabModal = new FabModal(options);

    this.modals.push(fabModal);

    this._initHandlers(fabModal);
  }

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

  resortModal() {
    const startZIndex = "900";
    this.modals.forEach((modal: FabModal, index: number) => {
      modal.index = startZIndex + index;
    });
  }
}
