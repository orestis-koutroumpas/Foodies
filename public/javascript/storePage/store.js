import { initializePage } from './initializePage.js';
import { setupModal } from './modalManagement.js';
import { handleLikedStore } from './likedStore.js';

document.addEventListener('DOMContentLoaded', (event) => {
    handleLikedStore();
    initializePage();
    setupModal();
});