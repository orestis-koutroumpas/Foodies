import { initializeTabsManagement } from './tabsManagement.js';
import { initialize } from './eventListeners.js';
import { renderAllProducts } from './productRendering.js';
import { addStoreInfo } from './storeInfo.js';
import { toggleSidebar, handleResize } from './utilities.js';
import { fetchStoreInfo, storeInfo } from './data.js';

// Extract store name from URL
const pathSegments = window.location.pathname.split('/');
const storeName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');


function loadTomTomScript(callback) {
    if (!window.tomtomScriptLoaded) {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.onload = () => {
            window.tomtomScriptLoaded = true;
            callback();
        };
        scriptElement.onerror = function() {
            console.error('Failed to load TomTom SDK script');
        };
        document.head.appendChild(scriptElement);
    } else {
        callback();
    }
}

function initializeStoreMap(address) {
    loadTomTomScript(() => {
        fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV&language=en-US`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const coordinates = data.results[0].position;

                    const map = tt.map({
                        key: '9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV',
                        container: 'store-map',
                        center: [coordinates.lon, coordinates.lat],
                        zoom: 15
                    });

                    new tt.Marker().setLngLat([coordinates.lon, coordinates.lat]).addTo(map);
                } else {
                    console.error('No results found for the address.');
                }
            })
            .catch(error => {
                console.error('Fallback geocoding error:', error);
            });
    });
}

function initializeStoreButton(address) {
    const button = document.querySelector('.button');
    if (button) {
        button.href = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&hl=en`;
    }
}


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

        await fetchStoreInfo(storeName);
        const storeId = storeInfo.id;

        initializeStoreMap(storeInfo.address);
        initializeStoreButton(storeInfo.address);
        addStoreInfo(storeInfo);

        // Initialize tabs management and products rendering
        await initializeTabsManagement(storeName, '.tabs-box');
        
        // Fetch store info to get the storeId
        await fetchStoreInfo(storeName);


        await renderAllProducts(storeId);
}
