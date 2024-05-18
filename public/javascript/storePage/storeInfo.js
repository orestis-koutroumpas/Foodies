// public/javascript/storePage/main.js
import { fetchStoreInfo, getStoreInfo } from './data.js';

// Extract store name from URL
const pathSegments = window.location.pathname.split('/');
const storeName = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');

fetchStoreInfo(storeName).then(() => {
    const storeInfo = getStoreInfo();
    initializeMap(storeInfo.address);
    initializeButton(storeInfo.address);
    addStoreInfo(storeInfo);
});

function loadTomTomScript(callback) {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.onload = callback;
    scriptElement.onerror = function() {
        console.error('Failed to load TomTom SDK script');
    };
    document.head.appendChild(scriptElement);
}

export function initializeMap(address) {
    loadTomTomScript(() => {

        // Use the fallback approach to directly fetch the coordinates using the geocoding API
        fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV`)
            .then(response => response.json())
            .then(data => {

                if (data.results && data.results.length > 0) {
                    const coordinates = data.results[0].position;

                    const map = tt.map({
                        key: '9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV',
                        container: 'map',
                        center: [coordinates.lon, coordinates.lat],
                        zoom: 15
                    });

                    const marker = new tt.Marker().setLngLat([coordinates.lon, coordinates.lat]).addTo(map);
                }
            })
            .catch(error => {
                console.error('Fallback geocoding error:', error);
            });
    });
}

export function initializeButton(address) {
    var button = document.querySelector('.button');
    button.href = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15`;
}

export function addStoreInfo(storeInfo) {
    var storeInfoDiv = document.querySelector('.Store-Location .Store-Info');
    
    // Clear existing content
    storeInfoDiv.innerHTML = '';

    var h2 = document.createElement('h2');
    h2.textContent = 'Store Information';
    storeInfoDiv.appendChild(h2);

    var p1 = document.createElement('p');
    p1.textContent = 'Delivery Hours:';
    storeInfoDiv.appendChild(p1);

    for (var day in storeInfo.deliveryHours) {
        var p = document.createElement('p');
        p.className = 'delivery-hours'; 
        p.textContent = day + ' :  ' + storeInfo.deliveryHours[day];
        p1.appendChild(p);
    }

    var p2 = document.createElement('p');
    p2.textContent = 'Store Address:';
    var a = document.createElement('a'); 
    a.className = 'address';
    a.href = '#'; 
    a.textContent = storeInfo.address;
    a.addEventListener('click', function(event) {
        event.preventDefault(); 
        var url = `https://www.google.com/maps?q=${encodeURIComponent(storeInfo.address)}&z=15`;
        window.open(url, '_blank'); 
    }); 
    p2.appendChild(a);
    storeInfoDiv.appendChild(p2);

    var p3 = document.createElement('p');
    p3.textContent = 'Contact Phone:';
    var span3 = document.createElement('span');
    span3.textContent = storeInfo.phone;
    span3.className = 'phone';
    p3.appendChild(span3);
    storeInfoDiv.appendChild(p3);
}

