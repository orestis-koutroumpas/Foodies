// public/javascript/cartModal/cart.js

import { getProductDetails, closeModal } from '../storePage/modalManagement.js';
import { openCartModal, extractStoreNameFromURL } from './cart-modal.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
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
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.querySelector('.cart-empty');

    if (!cartItemsContainer) {
        console.error('Cart items container not found.');
        return;
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
        <div class="cart-item-details">
            <span>${productDetails.productName}</span>
            <span class="cart-item-price"><strong>${parseFloat(productDetails.finalPrice.replace('€', '').replace(',', '.')).toFixed(2)} €</strong></span>
        </div>
        <div class="cart-item-controls">
            <button class="edit-quantity-btn">${productDetails.quantity} <i class="fas fa-chevron-down"></i></button>
        </div>
    `;

    cartItemsContainer.appendChild(cartItem);
    console.log('Cart item added to DOM:', cartItem);

    // Attach event listeners to the new cart item
    attachEventListeners(cartItem);
    updateCartTotal();
}

function attachEventListeners(cartItem) {
    const editQuantityBtn = cartItem.querySelector('.edit-quantity-btn');

    if (editQuantityBtn) {
        console.log('Attaching click event to quantity button:', editQuantityBtn);
        editQuantityBtn.addEventListener('click', function(event) {
            console.log('Quantity button clicked');
            event.stopPropagation();
            toggleQuantityControls(editQuantityBtn, cartItem);
        });
    } else {
        console.error('Edit quantity button not found.');
    }
}

function toggleQuantityControls(editQuantityBtn, cartItem) {
    const quantity = editQuantityBtn.textContent.trim().split(' ')[0];
    const isExpanded = editQuantityBtn.classList.toggle('expanded');

    if (isExpanded) {
        editQuantityBtn.innerHTML = `
            <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
            <span class="quantity">${quantity}</span>
            <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
        `;
        attachSubEventListeners(editQuantityBtn, cartItem);
    } else {
        editQuantityBtn.innerHTML = `${quantity} <i class="fas fa-chevron-down"></i>`;
    }
}

function attachSubEventListeners(editQuantityBtn, cartItem) {
    const minusBtn = editQuantityBtn.querySelector('.quantity-btn.minus');
    const plusBtn = editQuantityBtn.querySelector('.quantity-btn.plus');
    const deleteBtn = editQuantityBtn.querySelector('.delete-btn');
    const quantitySpan = editQuantityBtn.querySelector('.quantity');

    if (minusBtn) {
        minusBtn.addEventListener('click', function(event) {
            console.log('Minus button clicked');
            event.stopPropagation();
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
                updateCartTotal();
            }
        });
    } else {
        console.error('Minus button not found.');
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', function(event) {
            console.log('Plus button clicked');
            event.stopPropagation();
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
            updateCartTotal();
        });
    } else {
        console.error('Plus button not found.');
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(event) {
            console.log('Delete button clicked');
            event.stopPropagation();
            const cartItemsContainer = document.getElementById('cartItemsContainer');
            cartItemsContainer.removeChild(cartItem);
            updateCartTotal();
        });
    } else {
        console.error('Delete button not found.');
    }
}

function updateCartTotal() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.querySelector('.cart-empty');
    let totalButton = document.getElementById('cartTotal');

    if (!cartItemsContainer) return;

    let total = 0;
    let itemCount = 0;
    cartItemsContainer.querySelectorAll('.cart-item').forEach(cartItem => {
        const quantitySpan = cartItem.querySelector('.quantity');
        const quantity = quantitySpan ? parseInt(quantitySpan.textContent) : parseInt(cartItem.querySelector('.edit-quantity-btn').textContent.split(' ')[0]);
        const priceSpan = cartItem.querySelector('.cart-item-details .cart-item-price strong');
        const price = priceSpan ? parseFloat(priceSpan.textContent.replace('€', '').replace(',', '.')) : 0;
        total += price;
        itemCount += 1;
    });

    if (itemCount > 0) {
        if (!totalButton) {
            totalButton = document.createElement('button');
            totalButton.id = 'cartTotal';
            totalButton.className = 'cart-total-button';
            document.getElementById('cartModal').appendChild(totalButton);
        }
        totalButton.textContent = `Total: ${total.toFixed(2)} €`;
        totalButton.style.display = 'block';

        totalButton.addEventListener('click', function() {
            console.log('Total button clicked');
        });
    } else {
        if (totalButton) {
            totalButton.remove();
        }
    }

    if (emptyCartMessage) {
        emptyCartMessage.style.display = itemCount > 0 ? 'none' : 'block';
    }
}

window.updateCartTotal = updateCartTotal; // Make updateCartTotal accessible globally

