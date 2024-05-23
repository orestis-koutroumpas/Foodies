import { initializeTabsManagement } from './tabsManagement.js';
import { initialize } from './eventListeners.js';
import { renderAllProducts } from './productRendering.js';
import { addStoreInfo } from './storeInfo.js';
import { toggleSidebar, handleResize } from './utilities.js';
import { fetchStoreInfo, storeInfo } from './data.js';

const pathSegments = window.location.pathname.split('/');
const storeName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');

export async function initializePage() {
    try {
    
        // Check if the current page is 'store'
        if (window.location.pathname.indexOf('store') > -1) {
            var searchBar = document.querySelector('.search-form');

            if (searchBar) {
                searchBar.style.display = 'none'; // Hide the search bar
            }
        }

        window.onresize = handleResize;
    } catch (error) {
        console.error('Error initializing page:', error);
    }

        // Other initializations
        initialize();
        
        toggleSidebar();
        handleResize();

        // Initialize tabs management and products rendering
        await initializeTabsManagement(storeName, '.tabs-box');
        
        // Fetch store info to get the storeId
        await fetchStoreInfo(storeName);

        // Assuming storeInfo now contains the store details
        const storeId = storeInfo.id;

        addStoreInfo(storeInfo);

        await renderAllProducts(storeId);
}
