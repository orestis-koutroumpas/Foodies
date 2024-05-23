// public/javascript/cartModal/cart.js

import { getProductDetails, closeModal } from '../storePage/modalManagement.js';
import { openCartModal, extractStoreNameFromURL } from './cart-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.modal-footer .btn');

    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productDetails = getProductDetails();
            addToCartButton.classList.add('active');
            addProductToCart(productDetails);
        });

        addToCartButton.addEventListener('animationend', (event) => {
            if (event.animationName === 'text2' || event.animationName === 'cart') {
                closeModal();
                const storeName = extractStoreNameFromURL();
                openCartModal(storeName);
            }
        });
    } else {
        console.error('Add to Cart button not found.');
    }
});

function addProductToCart(productDetails) {
    const cartItemsContainer = document.getElementById('cartItemsContainerModal');
    const emptyCartMessage = document.querySelector('.cart-empty-modal');

    if (!cartItemsContainer) {
        console.error('Cart items container not found.');
        return;
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }

    const quantity = parseInt(productDetails.quantity, 10);
    if (isNaN(quantity)) {
        console.error('Invalid quantity:', productDetails.quantity);
        return;
    }

    const price = parseFloat(productDetails.finalPrice.replace('€', '').replace(',', '.')).toFixed(2);

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item-modal';

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

    cartItemsContainer.appendChild(cartItem);

    // Attach event listeners to the new cart item
    attachEventListeners(cartItem);
    updateCartTotal();
}

function attachEventListeners(cartItem) {
    const quantityToggle = cartItem.querySelector('.quantity-toggle-modal');

    if (quantityToggle) {
        quantityToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent immediate reversion
            toggleQuantityControls(this);
        });
    }

    document.addEventListener('click', function(event) {
        const expandedControls = document.querySelectorAll('.quantity-controls-modal');
        expandedControls.forEach(control => {
            if (!control.contains(event.target)) {
                revertQuantityDisplay(control);
            }
        });
    });
}

function toggleQuantityControls(toggle) {
    const cartItem = toggle.closest('.cart-item-modal');
    const quantityText = toggle.textContent.trim().split(' ')[0];
    const quantity = parseInt(quantityText, 10);

    if (isNaN(quantity)) {
        console.error('Invalid quantity:', quantityText);
        return;
    }

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
    quantityDisplay.innerHTML = '';
    quantityDisplay.appendChild(quantityControls);

    attachQuantityButtonListeners(cartItem);
}

function attachQuantityButtonListeners(cartItem) {
    const minusButton = cartItem.querySelector('.quantity-btn.minus');
    const plusButton = cartItem.querySelector('.quantity-btn.plus');
    const trashButton = cartItem.querySelector('.quantity-btn.trash');

    minusButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        decreaseQuantity(this);
    });

    plusButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        increaseQuantity(this);
    });

    trashButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from propagating to document
        removeCartItem(this);
    });
}

function decreaseQuantity(button) {
    let quantityElement = button.nextElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    if (currentQuantity > 1) {
        let newQuantity = currentQuantity - 1;
        quantityElement.textContent = newQuantity;
        updateItemPrice(button, newQuantity);
        updateCartTotal();
    }
}

function increaseQuantity(button) {
    let quantityElement = button.previousElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent, 10);

    let newQuantity = currentQuantity + 1;
    quantityElement.textContent = newQuantity;
    updateItemPrice(button, newQuantity);
    updateCartTotal();
}

function updateItemPrice(button, newQuantity) {
    let cartItem = button.closest('.cart-item-modal');
    let priceElement = cartItem.querySelector('.cart-item-price-modal');
    let pricePerUnit = parseFloat(priceElement.dataset.pricePerUnit);
    let newPrice = pricePerUnit * newQuantity;
    priceElement.innerHTML = `<strong>${newPrice.toFixed(2)} €</strong>`;
}

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
    attachEventListeners(quantityDisplay);
    updateCartTotal();
}

function removeCartItem(button) {
    let cartItem = button.closest('.cart-item-modal');
    cartItem.remove();
    updateCartTotal();
}

function updateCartTotal() {
    const cartItemsContainer = document.getElementById('cartItemsContainerModal');
    const emptyCartMessage = document.querySelector('.cart-empty-modal');
    let totalButton = document.getElementById('cartTotalModal');

    if (!cartItemsContainer) return;

    let total = 0;
    let cartItems = [];
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
        const commentInput = cartItem.querySelector('.cart-item-comment-input'); // Assuming each cart item has an input for comments
        const comment = commentInput ? commentInput.value.trim() : '';

        total += price;
        cartItems.push({
            name: name,
            price: price,
            quantity: quantity,
            image: image,
            comment: comment
        });
    });

    if (cartItems.length > 0) {
        if (!totalButton) {
            totalButton = document.createElement('button');
            totalButton.id = 'cartTotalModal';
            totalButton.className = 'cart-total-button-modal';
            document.getElementById('cartModal').appendChild(totalButton);
        }
        totalButton.textContent = `Total: ${total.toFixed(2)} €`;
        totalButton.style.display = 'block';

        totalButton.addEventListener('click', function() {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            localStorage.setItem('totalPrice', total.toFixed(2));
            const storeName = extractStoreNameFromURL();
            window.location.href = `/store/${storeName}/checkout`;
        });
    } else {
        if (totalButton) {
            totalButton.remove();
        }
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = cartItems.length > 0 ? 'none' : 'block';
    }
}

window.updateCartTotal = updateCartTotal; // Make updateCartTotal accessible globally
