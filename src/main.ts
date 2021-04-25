import "./style.css";
import { FabModal } from "./core/FabModal";
import { FabModalManager } from "./core/FabModalManager";

// For disable error TS -> Property 'X' does not exist on type 'Window'
declare global {
  interface Window {
    modalManager: FabModalManager;
    modal: FabModal;
  }
}

window.modalManager = new FabModalManager();
window.modal = new FabModal();
