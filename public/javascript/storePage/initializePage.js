import { generateTabs } from './tabsManagement.js';
import { initialize } from './eventListeners.js';
import { generateSections, renderAllProducts } from './productRendering.js';
import { initializeMap, initializeButton, addStoreInfo } from './storeInfo.js';
import { toggleSidebar, handleResize } from './utilities.js';
import { storeInfo, fetchProducts } from './data.js';

export function initializePage() {
    generateTabs('.tabs-box');
    initialize();
    generateSections();
    fetchProducts(renderAllProducts);
    initializeMap();
    initializeButton();
    addStoreInfo(storeInfo);
    toggleSidebar();
    handleResize();

    // Check if the current page is 'store'
    if (window.location.pathname.indexOf('store') > -1) {
        var searchBar = document.querySelector('.search-form'); 

        if (searchBar) {
            searchBar.style.display = 'none'; // Hide the search bar
        }
    }

    window.onresize = handleResize;
}
