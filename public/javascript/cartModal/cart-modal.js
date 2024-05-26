// public/javascript/cartModal/cart-modal.js

// Function to open the cart modal
async function openCartModal(storeName) {
    const cartModal = document.getElementById('cartModal'); // Get the cart modal element
    const cartOverlay = document.getElementById('cartOverlay'); // Get the cart overlay element

    try {
        // Fetch the cart modal content from the server
        const response = await fetch(`/store/${storeName}/cart-modal`);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle network errors
        }
        const html = await response.text(); // Get the HTML content

        // Parse the fetched HTML and append it to the cart modal
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const cartContent = tempDiv.querySelector('.cart-content'); // Get the cart content from the fetched HTML
        const currentCartItems = document.getElementById('cartItemsContainerModal').innerHTML; // Retain existing cart items
        cartModal.innerHTML = '';
        cartModal.appendChild(cartContent); // Append new cart content to the modal
        document.getElementById('cartItemsContainerModal').innerHTML = currentCartItems; // Restore existing cart items

        cartModal.classList.add('open'); // Open the cart modal
        cartOverlay.classList.add('open'); // Show the cart overlay
        window.history.pushState({ path: `/store/${storeName}/cart-modal` }, '', `/store/${storeName}/cart-modal`); // Update browser history

        // Reattach the event listener to the new close button in the modal content
        document.querySelector('.close-cart').addEventListener('click', closecartModal);

        // Ensure cart total is updated when modal is opened
        setTimeout(() => {
            window.updateCartTotal();
        }, 0);
    } catch (error) {
        console.error('Error fetching cart modal:', error); // Log errors to the console
    }
}

// Function to close the cart modal
function closecartModal() {
    const cartModal = document.getElementById('cartModal'); // Get the cart modal element
    const cartOverlay = document.getElementById('cartOverlay'); // Get the cart overlay element

    if (cartModal) {
        cartModal.classList.remove('open'); // Close the cart modal
    }

    if (cartOverlay) {
        cartOverlay.classList.remove('open'); // Hide the cart overlay
    }

    // Update browser history to remove '/cart-modal' from the URL
    window.history.pushState(null, '', window.location.pathname.replace('/cart-modal', ''));
}

// Function to extract the store name from the URL
function extractStoreNameFromURL() {
    const pathParts = window.location.pathname.split('/'); // Split the URL path
    const storeNameIndex = pathParts.indexOf('store') + 1; // Find the store name index
    return pathParts[storeNameIndex]; // Return the store name
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('#cart a'); // Get the cart icon element
    const cartOverlay = document.getElementById('cartOverlay'); // Get the cart overlay element

    // Event listener for cart icon click
    cartIcon.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const storeName = extractStoreNameFromURL(); // Extract store name from URL
        openCartModal(storeName); // Open the cart modal
    });

    // Event listener for cart overlay click
    cartOverlay.addEventListener('click', closecartModal); // Close the cart modal on overlay click

    // Event listener for browser history navigation
    window.addEventListener('popstate', function(event) {
        if (!window.location.pathname.includes('/cart-modal')) {
            closecartModal(); // Close the cart modal if URL does not include '/cart-modal'
        }
    });

    // Check if the current URL should display the cart modal on page load
    if (window.location.pathname.includes('/cart-modal')) {
        const storeName = extractStoreNameFromURL(); // Extract store name from URL
        openCartModal(storeName); // Open the cart modal
    }
});

// Export functions for use in other modules
export { openCartModal, closecartModal, extractStoreNameFromURL };
