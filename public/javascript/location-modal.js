// public/javascript/location-modal.js

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

document.addEventListener('DOMContentLoaded', () => {
    const locationIcon = document.getElementById('location');
    const locationModal = document.getElementById('locationModal');
    const closeBtn = document.querySelector('.location-content .close');
    const saveLocationBtn = document.getElementById('saveLocationBtn');
    let map, marker;

    locationIcon.addEventListener('click', async () => {
        locationModal.style.display = 'flex';
        await initMap();
    });

    closeBtn.addEventListener('click', () => {
        locationModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === locationModal) {
            locationModal.style.display = 'none';
        }
    });

    saveLocationBtn.addEventListener('click', async () => {
        const position = marker.getLngLat();
        const address = await getAddressFromCoordinates(position.lat, position.lng);
        await updateUserAddress(address);
        locationModal.style.display = 'none';
        document.getElementById('location-text').textContent = address;
    });

    async function initMap() {
        const userAddress = document.getElementById('location-text').textContent.trim();
        let initialPosition = { lat: 37.7749, lng: -122.4194 }; // Default position

        if (userAddress && /[a-zA-Z0-9\s,]/.test(userAddress) && !/^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(userAddress)) {
            try {
                const response = await fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(userAddress)}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV&language=en-US`);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const position = data.results[0].position;
                    initialPosition = { lat: position.lat, lng: position.lon };
                }
            } catch (error) {
                console.error('Error fetching geocode data:', error);
            }
        } else if (userAddress && /^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(userAddress)) {
            const [lat, lng] = userAddress.split(',').map(Number);
            if (!isNaN(lat) && !isNaN(lng)) {
                initialPosition = { lat, lng };
            }
        }

        loadTomTomScript(() => {
            tt.setProductInfo('FoodiesApp', '1.0');
            map = tt.map({
                key: '9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV',
                container: 'modal-map',
                center: initialPosition,
                zoom: 15
            });

            marker = new tt.Marker({
                draggable: true
            }).setLngLat(initialPosition).addTo(map);
        });
    }

    async function getAddressFromCoordinates(lat, lng) {
        try {
            const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV&language=en-US`);
            const data = await response.json();
            if (data.addresses && data.addresses.length > 0) {
                return data.addresses[0].address.freeformAddress;
            } else {
                throw new Error('No address found for these coordinates');
            }
        } catch (error) {
            console.error('Error fetching address from coordinates:', error);
            return `${lat}, ${lng}`;
        }
    }

    async function updateUserAddress(address) {
        try {
            const response = await fetch('/update-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });

            if (!response.ok) {
                throw new Error('Failed to update address');
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    }
});
