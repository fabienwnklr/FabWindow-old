import { FabModal } from './core/FabModal';
import { FabModalManager } from './core/FabModalManager';

// For disable error TS -> Property 'X' does not exist on type 'Window'
declare global {
    interface Window {
        modalManager: FabModalManager;
        // modal: FabModal;
    }
}

window.modalManager = new FabModalManager();
window.FabModal = FabModal;
const app = document.querySelector('#app');
if (app !== null) {
  app.innerHTML = `
  <button onclick="modalManager.createModal({title: 'titre modal manager'})">Create with modal manager</button>
  <button onclick="new FabModal({title: 'titre', content: 'contenu', draggable: true, expandable: false, reducible: false});">Create simple modal</button>
`;
}
