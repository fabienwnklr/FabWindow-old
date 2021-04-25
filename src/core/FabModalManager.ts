import { FabModal } from "./FabModal";
// Types
import { ModalManagerOptions } from "../types/modal-manager-options";
import { ModalOptions } from "../types/modal-options";

export class FabModalManager {
  public options: ModalManagerOptions;

  constructor(options?: ModalManagerOptions) {
    if (!options || typeof options !== "object") {
      this.options = this.defaultOptions;
    } else {
      this.options = { ...this.defaultOptions, ...options };
    }
  }

  get defaultOptions() {
    return {
      modal: [],
    };
  }

  /**
   *
   * @param {object} options
   * @returns {FabModal}
   */
  createModal(options: ModalOptions) {
    const modal = new FabModal(options);

    this.options.modal.push(modal);

    return modal;
  }
}
