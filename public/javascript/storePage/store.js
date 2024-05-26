import { initializePage } from './initializePage.js';
import { setupModal } from './modalManagement.js';
import { handleLikedStore } from './likedStore.js';
import { initializeProductSearch } from './productSearch.js';

document.addEventListener('DOMContentLoaded', (event) => {
    handleLikedStore();
    initializePage();
    initializeProductSearch();
    setupModal();
});