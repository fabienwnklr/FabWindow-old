import { FabModal } from "./FabModal";
import { modalManagerDefaultOptions } from "./default";
// Types
import type { ModalManagerOptions } from "./types/modal-manager-options";
import type { ModalOptions } from "./types/modal-options";

// Style
import './style/fabmodal-manager.css'

declare global {
  interface Window {
    FabModalManager: typeof FabModalManager;
  }
}

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
      this.options = modalManagerDefaultOptions;
    } else {
      this.options = { ...modalManagerDefaultOptions, ...options };
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

    fabModal.$modalTab.addEventListener("mousedown", this.setFocused.bind(this));

    fabModal.$modalTab.querySelector('.fab-tab-close')?.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();

      this.destroyModal(fabModal);
    })
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

    this.addModal(newModal);

    newModal.show();

    return newModal;
  }

  addModal(modal: FabModal) {
    this.modals.push(modal);
    
    if (this.options.container) {
      modal.modalTab = document.createElement('div');
      modal.$modalTab.classList.add('fab-modal-tab');
      modal.$modalTab.innerHTML = `${modal.options.title || ''} <button class="fab-tab-close">x</button>`;

      if (this.$modalContainer.style.display === 'none') {
        this.$modalContainer.style.display = '';
      }
      this.$modalContainer.appendChild(modal.$modalTab);
    }
    
    this._initHandlers(modal);

    return modal;
  }

  /**
   * @function
   * Set the focus to modal
   */
  setFocused(ev: MouseEvent) {
    const fabModalFocused = ev.currentTarget as HTMLElement;
    const focusedModal = this.modals.find(modal => modal.options.id === fabModalFocused.id)

    if (typeof focusedModal !== 'undefined' && focusedModal.active === true && focusedModal.$el.classList.contains('active') === true) return;

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

    if (this.modals.length === 0) {
      this.$modalContainer.style.display = 'none';
    }
  }
}

window.FabModalManager = FabModalManager;