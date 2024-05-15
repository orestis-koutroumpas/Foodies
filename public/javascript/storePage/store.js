import { initializePage } from './initializePage.js';
import { setupModal } from './modalManagement.js';

document.addEventListener('DOMContentLoaded', (event) => {
    initializePage();
    setupModal();
});