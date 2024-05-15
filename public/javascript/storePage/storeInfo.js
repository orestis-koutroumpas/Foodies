import {locationCoordinates} from './data.js';

export function initializeMap() {
    var scriptElement = document.createElement('script');
    scriptElement.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
    scriptElement.async = true;
    scriptElement.defer = true;
    document.head.appendChild(scriptElement);

    scriptElement.onload = function() {
        var map = tt.map({
            key: '9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV',
            container: 'map',
            center: [locationCoordinates.lng, locationCoordinates.lat],
            zoom: 15
        });

        var marker = new tt.Marker().setLngLat([locationCoordinates.lng, locationCoordinates.lat]).addTo(map);
    };
}

export function initializeButton() {
    var button = document.querySelector('.button');
    button.href = `https://www.google.com/maps?q=${locationCoordinates.lat},${locationCoordinates.lng}&z=15`;
}

export function addStoreInfo(storeInfo) {
    var storeInfoDiv = document.querySelector('.Store-Location .Store-Info');
    var h2 = document.createElement('h2');
    h2.textContent = 'Πληροφορίες Καταστήματος';

    var p1 = document.createElement('p');
    p1.textContent = 'Ώρες Παραδόσεων:';
    var span1 = document.createElement('span');
    storeInfoDiv.appendChild(p1);
    
    for (var day in storeInfo.deliveryHours) {
        var p = document.createElement('p');
        p.className = 'delivery-hours'; 
        p.textContent = day + ' :  ' + storeInfo.deliveryHours[day];
        p1.appendChild(p);
    }

    var p2 = document.createElement('p');
    p2.textContent = 'Διεύθυνση Καταστήματος:';
    var a = document.createElement('a'); 
    a.className = 'address'
    a.href = '#'; 
    a.textContent = storeInfo.address;
    a.addEventListener('click', function(event) {
        event.preventDefault(); 
        var url = `https://www.google.com/maps?q=${locationCoordinates.lat},${locationCoordinates.lng}&z=15`;
        window.open(url, '_blank'); 
    }); 
    p2.appendChild(a);

    var p3 = document.createElement('p');
    p3.textContent = 'Τηλέφωνο Επικοινωνίας:';
    var span3 = document.createElement('span');
    span3.textContent = storeInfo.phone;
    span3.className = 'phone';
    p3.appendChild(span3);

    storeInfoDiv.appendChild(h2);
    storeInfoDiv.appendChild(p1);
    storeInfoDiv.appendChild(p2);
    storeInfoDiv.appendChild(p3);
}
