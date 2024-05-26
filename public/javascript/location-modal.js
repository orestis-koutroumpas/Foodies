// public/javascript/location-modal.js

// Function to load the TomTom script
function loadTomTomScript(callback) {
    if (!window.tomtomScriptLoaded) { // Check if the TomTom script is already loaded
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.14.0/maps/maps-web.min.js';
        scriptElement.async = true; // Load the script asynchronously
        scriptElement.defer = true; // Defer the script loading
        scriptElement.onload = () => {
            window.tomtomScriptLoaded = true; // Set flag to indicate script is loaded
            callback(); // Execute callback function after the script is loaded
        };
        scriptElement.onerror = function() {
            console.error('Failed to load TomTom SDK script'); // Log error if script fails to load
        };
        document.head.appendChild(scriptElement); // Append the script element to the document head
    } else {
        callback(); // Execute callback function if script is already loaded
    }
}

// Event listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    const locationIcon = document.getElementById('location'); // Get the location icon element
    const locationModal = document.getElementById('locationModal'); // Get the location modal element
    const closeBtn = document.querySelector('.location-content .close'); // Get the close button element
    const saveLocationBtn = document.getElementById('saveLocationBtn'); // Get the save location button element
    let map, marker; // Variables for map and marker

    // Event listener for click event on location icon
    locationIcon.addEventListener('click', async () => {
        locationModal.style.display = 'flex'; // Display the location modal
        await initMap(); // Initialize the map
    });

    // Event listener for click event on close button
    closeBtn.addEventListener('click', () => {
        locationModal.style.display = 'none'; // Hide the location modal
    });

    // Event listener for click event on window to close the modal
    window.addEventListener('click', (event) => {
        if (event.target === locationModal) {
            locationModal.style.display = 'none'; // Hide the location modal
        }
    });

    // Event listener for click event on save location button
    saveLocationBtn.addEventListener('click', async () => {
        const position = marker.getLngLat(); // Get marker position
        const address = await getAddressFromCoordinates(position.lat, position.lng); // Get address from coordinates
        await updateUserAddress(address); // Update user address
        locationModal.style.display = 'none'; // Hide the location modal
        document.getElementById('location-text').textContent = address; // Update the location text element with the address
    });

    // Function to initialize the map
    async function initMap() {
        const userAddress = document.getElementById('location-text').textContent.trim(); // Get the user address
        let initialPosition = { lat: 37.7749, lng: -122.4194 }; // Default position

        // Check if user address is valid and fetch coordinates
        if (userAddress && /[a-zA-Z0-9\s,]/.test(userAddress) && !/^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(userAddress)) {
            try {
                const response = await fetch(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(userAddress)}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV&language=en-US`);
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const position = data.results[0].position;
                    initialPosition = { lat: position.lat, lng: position.lon }; // Update initial position
                }
            } catch (error) {
                console.error('Error fetching geocode data:', error); // Log error if geocode fetch fails
            }
        } else if (userAddress && /^\d+(\.\d+)?,\s*\d+(\.\d+)?$/.test(userAddress)) {
            const [lat, lng] = userAddress.split(',').map(Number); // Parse latitude and longitude from user address
            if (!isNaN(lat) && !isNaN(lng)) {
                initialPosition = { lat, lng }; // Update initial position
            }
        }

        // Load the TomTom script and initialize the map
        loadTomTomScript(() => {
            tt.setProductInfo('FoodiesApp', '1.0'); // Set product info for TomTom SDK
            map = tt.map({
                key: '9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV',
                container: 'modal-map', // Set the container for the map
                center: initialPosition, // Set the initial center of the map
                zoom: 15 // Set the initial zoom level
            });

            // Create a draggable marker and add it to the map
            marker = new tt.Marker({
                draggable: true
            }).setLngLat(initialPosition).addTo(map);
        });
    }

    // Function to get address from coordinates
    async function getAddressFromCoordinates(lat, lng) {
        try {
            const response = await fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lng}.json?key=9qYT4o7IeUnR3jVy3igqtiSIT3XUMphV&language=en-US`);
            const data = await response.json();
            if (data.addresses && data.addresses.length > 0) {
                return data.addresses[0].address.freeformAddress; // Return the freeform address
            } else {
                throw new Error('No address found for these coordinates'); // Throw error if no address found
            }
        } catch (error) {
            console.error('Error fetching address from coordinates:', error); // Log error if reverse geocode fetch fails
            return `${lat}, ${lng}`; // Return coordinates as fallback address
        }
    }

    // Function to update user address
    async function updateUserAddress(address) {
        try {
            const response = await fetch('/update-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }), // Send address as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to update address'); // Throw error if update fails
            }
        } catch (error) {
            console.error('Error updating address:', error); // Log error if update fails
        }
    }
});
