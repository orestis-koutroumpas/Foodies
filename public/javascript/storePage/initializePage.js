import { initializeTabsManagement } from './tabsManagement.js';
import { initialize } from './eventListeners.js';
import { renderAllProducts } from './productRendering.js';
import { addStoreInfo } from './storeInfo.js';
import { toggleSidebar, handleResize } from './utilities.js';
import { fetchStoreInfo, storeInfo } from './data.js';

// Extract store name from URL by splitting the pathname and replacing '-' with spaces
const pathSegments = window.location.pathname.split('/');
const storeName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');

// Function to load the TomTom script dynamically
function loadTomTomScript(callback) {
    if (!window.tomtomScriptLoaded) {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
        scriptElement.async = true;
        scriptElement.defer = true;
        scriptElement.onload = () => {
            window.tomtomScriptLoaded = true;
            callback(); // Execute callback function after the script loads
        };
        scriptElement.onerror = function() {
            console.error('Failed to load TomTom SDK script');
        };
        document.head.appendChild(scriptElement); // Append script to document head
    } else {
        callback(); // Execute callback function if script is already loaded
    }
}

// Function to initialize the store map using TomTom SDK
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

// Function to initialize the store button with Google Maps link
function initializeStoreButton(address) {
    const button = document.querySelector('.button');
    if (button) {
        button.href = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&hl=en`; // Set href attribute for the button
    }
}

// Function to initialize the page
export async function initializePage() {
    try {
        // Check if the current page is 'store'
        if (window.location.pathname.indexOf('store') > -1) {
            var searchBar = document.querySelector('.search-form');

            if (searchBar) {
                searchBar.style.display = 'none'; // Hide the search bar
            }
        }

        window.onresize = handleResize; // Attach resize event handler to window
    } catch (error) {
        console.error('Error initializing page:', error); // Log error to console
    }

    // Other initializations
    initialize(); // Initialize event listeners

    toggleSidebar(); // Initialize sidebar toggle
    handleResize(); // Handle initial resize

    await fetchStoreInfo(storeName); // Fetch store information
    const storeId = storeInfo.id;

    initializeStoreMap(storeInfo.address); // Initialize store map
    initializeStoreButton(storeInfo.address); // Initialize store button
    addStoreInfo(storeInfo); // Add store information to the page

    // Initialize tabs management and products rendering
    await initializeTabsManagement(storeName, '.tabs-box'); // Initialize tabs management

    // Fetch store info to get the storeId
    await fetchStoreInfo(storeName);

    await renderAllProducts(storeId); // Render all products for the store
}
