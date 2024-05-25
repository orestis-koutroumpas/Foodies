// public/javascript/cartModal/cart-modal.js

async function openCartModal(storeName) {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');

    try {
        const response = await fetch(`/store/${storeName}/cart-modal`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();

        // Parse the fetched HTML and append it to the cartModal
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const cartContent = tempDiv.querySelector('.cart-content');
        const currentCartItems = document.getElementById('cartItemsContainerModal').innerHTML;
        cartModal.innerHTML = '';
        cartModal.appendChild(cartContent);
        document.getElementById('cartItemsContainerModal').innerHTML = currentCartItems; // Retain existing cart items

        cartModal.classList.add('open');
        cartOverlay.classList.add('open');
        window.history.pushState({ path: `/store/${storeName}/cart-modal` }, '', `/store/${storeName}/cart-modal`);

        // Reattach the event listener to the new close button in the modal content
        document.querySelector('.close-cart').addEventListener('click', closecartModal);

        setTimeout(() => {
            window.updateCartTotal(); // Ensure cart total is updated when modal is opened
        }, 0);
    } catch (error) {
        console.error('Error fetching cart modal:', error);
    }
}

function closecartModal() {
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');

    if (cartModal) {
        cartModal.classList.remove('open');
    }

    if (cartOverlay) {
        cartOverlay.classList.remove('open');
    }

    window.history.pushState(null, '', window.location.pathname.replace('/cart-modal', ''));
}

function extractStoreNameFromURL() {
    const pathParts = window.location.pathname.split('/');
    const storeNameIndex = pathParts.indexOf('store') + 1;
    return pathParts[storeNameIndex];
}

document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('#cart a'); 
    const cartOverlay = document.getElementById('cartOverlay');

    cartIcon.addEventListener('click', function(event) {
        event.preventDefault();
        const storeName = extractStoreNameFromURL();
        openCartModal(storeName);
    });

    cartOverlay.addEventListener('click', closecartModal);
    window.addEventListener('popstate', function(event) {
        if (!window.location.pathname.includes('/cart-modal')) {
            closecartModal();
        }
    });

    // Check if the current URL should display the cart modal on page load
    if (window.location.pathname.includes('/cart-modal')) {
        const storeName = extractStoreNameFromURL();
        openCartModal(storeName);
    }
});

export { openCartModal, closecartModal, extractStoreNameFromURL };
