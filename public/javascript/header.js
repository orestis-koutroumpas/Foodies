// public/javascript/header.js

// Check if the user's address visibility state is stored in localStorage
let userAddressVisible = localStorage.getItem('userAddressVisible') === 'true';

// Function to update the visibility of the user's address
function updateUserAddressVisibility() {
    let userAddressElement = document.getElementById('user-address');
    let locationTextElement = document.getElementById('location-text');
    
    if (userAddressVisible) {
        // Show the user's address and hide the location text
        userAddressElement.style.display = 'block';
        locationTextElement.style.display = 'none';
    } else {
        // Hide the user's address and show the location text
        userAddressElement.style.display = 'none';
        locationTextElement.style.display = 'inline';
    }
}

// Call the function to initially set the visibility of the user's address
updateUserAddressVisibility();

// Function to toggle the visibility of the user's address
function toggleUserAddress() {
    let userAddressElement = document.getElementById('user-address');
    
    // Toggle the visibility state
    userAddressVisible = !userAddressVisible;

    // Update the visibility of the user's address
    updateUserAddressVisibility();

    // Store the visibility state in localStorage
    localStorage.setItem('userAddressVisible', userAddressVisible);
}