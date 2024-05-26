// public/javascript/cartModal/cart.js

import { getProductDetails, closeModal } from '../storePage/modalManagement.js';
import { openCartModal, closecartModal, extractStoreNameFromURL } from './cart-modal.js';

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cartOverlay = document.getElementById('cartOverlay'); // Get the cart overlay element
    const addToCartButton = document.querySelector('.modal-footer .btn'); // Get the "Add to Cart" button

    if (addToCartButton) {
        // Event listener for "Add to Cart" button click
        addToCartButton.addEventListener('click', () => {
            const productDetails = getProductDetails(); // Get product details
            addToCartButton.classList.add('active'); // Add active class to button
            addProductToCart(productDetails); // Add product to cart
        });

        // Event listener for animation end on "Add to Cart" button
        addToCartButton.addEventListener('animationend', (event) => {
            if (event.animationName === 'text2' || event.animationName === 'cart') {
                closeModal(); // Close modal
                const storeName = extractStoreNameFromURL(); // Extract store name from URL
                openCartModal(storeName); // Open cart modal
            }
        });
    } else {
        console.error('Add to Cart button not found.');
    }

    // Event listener for cart overlay click
    cartOverlay.addEventListener('click', closecartModal); // Close cart modal on overlay click

    // Event listener for browser history navigation
    window.addEventListener('popstate', function(event) {
        if (!window.location.pathname.includes('/cart-modal')) {
            closecartModal(); // Close cart modal if URL does not include '/cart-modal'
        }
    });

    updateCartTotal(); // Initial call to set up the cart total button and its listener
});

// Function to check if the user is authenticated
async function checkAuthentication(storeName) {
    try {
        const response = await fetch(`/store/${storeName}/checkout-status`, {
            method: 'GET',
            credentials: 'include', // Ensure credentials are included in the request
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            return false; // Return false if user is not authenticated
        }

        const result = await response.json();
        return result.isAuthenticated; // Return authentication status
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false; // Return false if an error occurs
    }
}

// Function to add product to cart
function addProductToCart(productDetails) {
    const cartItemsContainer = document.getElementById('cartItemsContainerModal'); // Get cart items container element
    const emptyCartMessage = document.querySelector('.cart-empty-modal'); // Get empty cart message element

    if (!cartItemsContainer) {
        console.error('Cart items container not found.');
        return;
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none'; // Hide empty cart message
    }

    const quantity = parseInt(productDetails.quantity, 10); // Parse quantity to integer
    if (isNaN(quantity)) {
        console.error('Invalid quantity:', productDetails.quantity);
        return;
    }

    const price = parseFloat(productDetails.finalPrice.replace('€', '').replace(',', '.')).toFixed(2); // Parse and format price

    // Create cart item element
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item-modal';

    // Set cart item inner HTML
    cartItem.innerHTML = `
        <div class="cart-item-image-modal" style="display: none;">
            <img src="${productDetails.image}" alt="${productDetails.productName}">
        </div>
        <div class="cart-item-details-modal">
            <span>${productDetails.productName}</span>
            <span class="cart-item-price-modal" data-price-per-unit="${(price / quantity).toFixed(2)}"><strong>${price} €</strong></span>
        </div>
        <div class="quantity-display-modal">
            <button class="quantity-toggle-modal">
                ${quantity} <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="cart-comment-wrapper" style="display: none;">
            <input type="text" class="cart-item-comment-input" placeholder="Add a comment" value="${productDetails.comment || ''}">
        </div>
    `;

    cartItemsContainer.appendChild(cartItem); // Append cart item to cart items container

    // Save to local storage
    saveCartToLocalStorage();

    // Attach event listeners to the new cart item
    attachEventListeners(cartItem);
    updateCartTotal(); // Update cart total
}

// Function to save cart items to local storage
function saveCartToLocalStorage() {
    const cartItems = [];
    document.querySelectorAll('.cart-item-modal').forEach(cartItem => {
        const name = cartItem.querySelector('.cart-item-details-modal span').textContent;
        const price = parseFloat(cartItem.querySelector('.cart-item-price-modal strong').textContent.replace('€', ''));
        const quantity = parseInt(cartItem.querySelector('.quantity-toggle-modal').textContent.trim().split(' ')[0], 10);
        const image = cartItem.querySelector('.cart-item-image-modal img').src;
        const comment = cartItem.querySelector('.cart-item-comment-input')?.value || '';

        cartItems.push({ name, price, quantity, image, comment });
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Cart items saved to local storage:', cartItems);
}


// Function to attach event listeners to cart item
function attachEventListeners(cartItem) {
    const quantityToggle = cartItem.querySelector('.quantity-toggle-modal');

    if (quantityToggle) {
        quantityToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent immediate reversion
            toggleQuantityControls(this); // Toggle quantity controls
        });
    }

    document.addEventListener('click', function(event) {
        const expandedControls = document.querySelectorAll('.quantity-controls-modal');
        expandedControls.forEach(control => {
            if (!control.contains(event.target)) {
                revertQuantityDisplay(control); // Revert quantity display if click outside controls
            }
        });
    });
}

// Function to toggle quantity controls
function toggleQuantityControls(toggle) {
    const cartItem = toggle.closest('.cart-item-modal');
    const quantityText = toggle.textContent.trim().split(' ')[0];
    const quantity = parseInt(quantityText, 10);

    if (isNaN(quantity)) {
        console.error('Invalid quantity:', quantityText);
        return;
    }

    // Create quantity controls element
    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls-modal';
    quantityControls.innerHTML = `
        <div class="quantity-control-container-modal">
            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
            <p class="item-quantity-modal">${quantity}</p>
            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
        </div>
        <button class="quantity-btn trash"><i class="fas fa-trash-alt"></i></button>
    `;

    const quantityDisplay = toggle.parentNode;
    quantityDisplay.innerHTML = ''; // Clear existing quantity display
    quantityDisplay.appendChild(quantityControls); // Append quantity controls

    attachQuantityButtonListeners(cartItem); // Attach event listeners to quantity buttons
}

// Function to attach event listeners to quantity buttons
function attachQuantityButtonListeners(cartItem) {
    const minusButton = cartItem.querySelector('.quantity-btn.minus');
    const plusButton = cartItem.querySelector('.quantity-btn.plus');
    const trashButton = cartItem.querySelector('.quantity-btn.trash');

    // Event listener for decrease quantity button
    minusButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        decreaseQuantity(this); // Decrease quantity
    });

    // Event listener for increase quantity button
    plusButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        increaseQuantity(this); // Increase quantity
    });

    // Event listener for remove cart item button
    trashButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        removeCartItem(this); // Remove cart item
    });
}

// Function to decrease quantity of cart item
function decreaseQuantity(button) {
    let quantityElement = button.nextElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    if (currentQuantity > 1) {
        let newQuantity = currentQuantity - 1;
        quantityElement.textContent = newQuantity; // Update quantity display
        updateItemPrice(button, newQuantity); // Update item price
        updateCartTotal(); // Update cart total
    }
}

// Function to increase quantity of cart item
function increaseQuantity(button) {
    let quantityElement = button.previousElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    let newQuantity = currentQuantity + 1;
    quantityElement.textContent = newQuantity; // Update quantity display
    updateItemPrice(button, newQuantity); // Update item price
    updateCartTotal(); // Update cart total
}

// Function to update item price based on quantity
function updateItemPrice(button, newQuantity) {
    let cartItem = button.closest('.cart-item-modal');
    let priceElement = cartItem.querySelector('.cart-item-price-modal');
    let pricePerUnit = parseFloat(priceElement.dataset.pricePerUnit);
    let newPrice = pricePerUnit * newQuantity;
    priceElement.innerHTML = `<strong>${newPrice.toFixed(2)} €</strong>`; // Update item price display
}

// Function to revert quantity display to original state
function revertQuantityDisplay(display) {
    const quantityElement = display.querySelector('.item-quantity-modal');
    const quantity = quantityElement ? quantityElement.textContent : "0";

    const quantityDisplay = display.parentNode;
    quantityDisplay.innerHTML = `
        <div class="quantity-display-modal">
            <button class="quantity-toggle-modal">
                ${quantity} <i class="fas fa-chevron-down"></i>
            </button>
        </div>
    `;
    attachEventListeners(quantityDisplay); // Re-attach event listeners
    updateCartTotal(); // Update cart total
}

// Function to remove cart item
function removeCartItem(button) {
    let cartItem = button.closest('.cart-item-modal');
    cartItem.remove(); // Remove cart item from DOM
    updateCartTotal(); // Update cart total
}

// Function to update cart total
async function updateCartTotal() {
    const cartItemsContainer = document.getElementById('cartItemsContainerModal'); // Get cart items container element
    const emptyCartMessage = document.querySelector('.cart-empty-modal'); // Get empty cart message element
    let totalButton = document.getElementById('cartTotalModal'); // Get cart total button
    let progressBarContainer = document.getElementById('cartProgressBarContainer'); // Get progress bar container
    let progressBar = document.getElementById('cartProgressBar'); // Get progress bar
    const minimumOrderAmount = parseFloat(window.minimumOrderAmount.replace('€', '')); // Remove currency symbol and convert to number

    if (!cartItemsContainer) return;

    let total = 0; // Initialize total amount
    let cartItems = []; // Initialize cart items array
    cartItemsContainer.querySelectorAll('.cart-item-modal').forEach(cartItem => {
        const quantitySpan = cartItem.querySelector('.item-quantity-modal');
        const quantity = quantitySpan ? parseInt(quantitySpan.textContent.trim(), 10) : parseInt(cartItem.querySelector('.quantity-toggle-modal').textContent.trim().split(' ')[0], 10);

        if (isNaN(quantity)) {
            console.error('Invalid quantity detected:', quantitySpan ? quantitySpan.textContent : cartItem.querySelector('.quantity-toggle-modal').textContent);
            return;
        }

        const priceSpan = cartItem.querySelector('.cart-item-details-modal .cart-item-price-modal strong');
        const price = priceSpan ? parseFloat(priceSpan.textContent.replace('€', '').replace(',', '.')) : 0;
        const name = cartItem.querySelector('.cart-item-details-modal span').textContent;
        const image = cartItem.querySelector('.cart-item-image-modal img')?.src || '';
        const commentInput = cartItem.querySelector('.cart-item-comment-input');
        const comment = commentInput ? commentInput.value.trim() : '';

        total += price; // Add item price to total
        cartItems.push({
            name: name,
            price: price,
            quantity: quantity,
            image: image,
            comment: comment
        });
    });

    if (cartItems.length > 0) {
        if (!progressBarContainer) {
            progressBarContainer = document.createElement('div'); // Create progress bar container if it doesn't exist
            progressBarContainer.id = 'cartProgressBarContainer';
            progressBarContainer.className = 'progress-bar-container';
            document.getElementById('cartModal').insertBefore(progressBarContainer, totalButton); // Insert progress bar container before total button

            progressBar = document.createElement('div'); // Create progress bar if it doesn't exist
            progressBar.id = 'cartProgressBar';
            progressBar.className = 'progress-bar';
            progressBarContainer.appendChild(progressBar); // Append progress bar to progress bar container
        }

        if (!totalButton) {
            totalButton = document.createElement('button'); // Create total button if it doesn't exist
            totalButton.id = 'cartTotalModal';
            totalButton.className = 'cart-total-button-modal disabled';
            document.getElementById('cartModal').appendChild(totalButton);
        }

        totalButton.textContent = `Total: ${total.toFixed(2)} €`; // Update total button text
        totalButton.style.display = 'block';

        // Event listener for total button click
        totalButton.addEventListener('click', async function() {
            closecartModal(); // Close cart modal
            const storeName = extractStoreNameFromURL(); // Extract store name from URL
            if (total >= minimumOrderAmount) {
                const isAuthenticated = await checkAuthentication(storeName); // Check user authentication

                if (isAuthenticated) {
                    window.location.href = `/store/${storeName}/checkout`; // Redirect to checkout if authenticated
                } else {
                    localStorage.setItem('intendedUrl', `/store/${storeName}/checkout`); // Save intended URL in local storage
                    const loginSignupButton = document.querySelector('.login-signup-button'); // Get login/signup button
                    if (loginSignupButton) {
                        loginSignupButton.click(); // Trigger login/signup process
                    }
                }
            }
        });

        if (progressBarContainer) {
            progressBarContainer.style.display = 'flex'; // Show progress bar container
            const progress = (total / minimumOrderAmount) * 100; // Calculate progress percentage
            progressBar.style.width = `${Math.min(progress, 100)}%`; // Update progress bar width
        }

        if (total >= minimumOrderAmount) {
            totalButton.disabled = false; // Enable total button if minimum order amount is reached
            totalButton.classList.remove('disabled'); // Remove disabled class
        } else {
            totalButton.disabled = true; // Disable total button if minimum order amount is not reached
            totalButton.classList.add('disabled'); // Add disabled class
        }

    } else {
        if (totalButton) {
            totalButton.remove(); // Remove total button if cart is empty
        }

        if (progressBarContainer) {
            progressBarContainer.style.display = 'none'; // Hide progress bar container if cart is empty
        }
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = cartItems.length > 0 ? 'none' : 'block'; // Show/hide empty cart message
    }
}

window.updateCartTotal = updateCartTotal; // Expose updateCartTotal function to global scope

// Call saveCartToLocalStorage whenever cart is updated
document.addEventListener('click', saveCartToLocalStorage);