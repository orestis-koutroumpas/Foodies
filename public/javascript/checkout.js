// public/javascript/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]'); // Retrieve cart items from localStorage
    const tipRadios = document.querySelectorAll('input[name="tipAmount"]'); // Get all tip radio buttons
    const placeOrderBtn = document.getElementById('placeOrderBtn'); // Get the place order button
    const modal = document.getElementById('placeOrderModal'); // Get the order modal element
    const redirectToHomeBtn = document.getElementById('redirectToHomeBtn'); // Get the redirect to home button

    if (cartItems.length > 0) {
        const cartItemsContainer = document.querySelector('.cart-items-container'); // Get the cart items container element
        cartItemsContainer.innerHTML = ''; // Clear the container before appending items

        // Loop through cart items and create HTML elements for each item
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';

            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <p>${item.name}</p>
                    <p class="item-price" data-price-per-unit="${(item.price / item.quantity).toFixed(2)}">${item.price.toFixed(2)}€</p>
                </div>
                ${item.comment ? `<div class="item-comment">
                    <button class="info-icon"><i class="fas fa-info-circle"></i></button>
                    <div class="comment-container">
                        <textarea class="comment-textarea">${item.comment}</textarea>
                        <div class="save-comment">
                            <button>Save</button>
                        </div>
                    </div>
                </div>` : ''}
                <div class="quantity-display">
                    <button class="quantity-toggle">
                        ${item.quantity} <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem); // Append the cart item to the container

            // Attach comment listeners only if there is a comment
            if (item.comment) {
                attachCommentListeners(cartItem, item);
            }
        });

        attachEventListeners(); // Attach event listeners to quantity buttons
        updateCartData(); // Update cart data (total price, etc.)

        // Add event listeners to the tip radio buttons
        tipRadios.forEach(radio => {
            radio.addEventListener('change', updateCartData);
        });

    } else {
        console.error('No cart items found.');
    }

    // Event listener for place order button
    placeOrderBtn.addEventListener('click', async function () {
        const cartItems = [];
        document.querySelectorAll('.cart-item').forEach(cartItem => {
            const name = cartItem.querySelector('.item-details p').textContent;
            const quantity = parseInt(cartItem.querySelector('.quantity-toggle').textContent.trim());
            const pricePerUnit = parseFloat(cartItem.querySelector('.item-price').dataset.pricePerUnit);
            const image = cartItem.querySelector('.item-image img').src;
            const commentElement = cartItem.querySelector('.comment-textarea');
            const comment = commentElement ? commentElement.value : '';

            cartItems.push({
                name: name,
                price: pricePerUnit * quantity,
                quantity: quantity,
                image: image,
                comment: comment
            });
        });

        const orderDetails = {
            userEmail: window.userEmail, // Retrieve this from the user's session or local storage
            storeId: window.storeId, // Retrieve the store ID dynamically
            deliveryAddress: window.userAddress, // Retrieve this from the user's profile or input
            tip: parseFloat(document.querySelector('input[name="tipAmount"]:checked').value) || 0,
            orderPrice: parseFloat(localStorage.getItem('totalPrice')) - parseFloat(window.deliveryFee),
            items: cartItems,
            method: document.querySelector('#payment_method').value, // Retrieve this from the payment method radio buttons
            paymentAmount: parseFloat(localStorage.getItem('totalPrice'))
        };

        modal.style.display = 'flex'; // Show the order modal

        try {
            const response = await fetch('/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                modal.style.display = 'flex'; // Show the order modal
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Event listener for redirect to home button
    redirectToHomeBtn.addEventListener('click', function () {
        window.location.href = '/home';
    });
});

// Function to attach comment listeners to cart items
function attachCommentListeners(cartItem, item) {
    const infoIcon = cartItem.querySelector('.info-icon'); // Get the info icon element
    const commentContainer = cartItem.querySelector('.comment-container'); // Get the comment container element
    const saveCommentButton = commentContainer.querySelector('.save-comment button'); // Get the save comment button

    // Event listener for info icon click
    infoIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        // Close any other open comment containers
        document.querySelectorAll('.comment-container.visible').forEach(container => {
            if (container !== commentContainer) {
                container.classList.remove('visible');
            }
        });

        // Toggle the visibility of the clicked comment container
        commentContainer.classList.toggle('visible');
    });

    // Event listener for save comment button click
    saveCommentButton.addEventListener('click', () => {
        const newComment = commentContainer.querySelector('.comment-textarea').value;
        item.comment = newComment; // Update the item comment
        commentContainer.classList.remove('visible'); // Hide the comment container
        updateCartData(); // Update cart data
    });

    // Event listener for document click to close comment container
    document.addEventListener('click', (event) => {
        if (!commentContainer.contains(event.target) && !infoIcon.contains(event.target)) {
            commentContainer.classList.remove('visible');
        }
    });
}

// Function to attach event listeners to quantity buttons
function attachEventListeners() {
    const quantityToggles = document.querySelectorAll('.quantity-toggle'); // Get all quantity toggle buttons

    quantityToggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent immediate reversion
            toggleQuantityControls(this); // Toggle quantity controls
        });
    });

    // Event listener for document click to revert quantity display
    document.addEventListener('click', function (event) {
        const expandedControls = document.querySelectorAll('.quantity-controls'); // Get all expanded quantity controls
        expandedControls.forEach(control => {
            if (!control.contains(event.target)) {
                revertQuantityDisplay(control); // Revert quantity display
            }
        });
    });
}

// Function to toggle quantity controls
function toggleQuantityControls(toggle) {
    const cartItem = toggle.closest('.cart-item'); // Get the closest cart item element
    const quantity = parseInt(toggle.textContent); // Get the current quantity

    // Update the quantity display to show controls
    toggle.parentNode.innerHTML = `
        <div class="quantity-controls">
            <div class="quantity-control-container">
                <button class="quantity-button minus"><i class="fas fa-minus"></i></button>
                <p class="quantity">${quantity}</p>
                <button class="quantity-button plus"><i class="fas fa-plus"></i></button>
            </div>
            <button class="quantity-button trash"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;

    attachQuantityButtonListeners(cartItem); // Attach event listeners to the quantity buttons
}

// Function to attach event listeners to quantity buttons
function attachQuantityButtonListeners(cartItem) {
    const minusButton = cartItem.querySelector('.quantity-button.minus'); // Get the minus button
    const plusButton = cartItem.querySelector('.quantity-button.plus'); // Get the plus button
    const trashButton = cartItem.querySelector('.quantity-button.trash'); // Get the trash button

    // Event listener for minus button click
    minusButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        decreaseQuantity(this); // Decrease quantity
    });

    // Event listener for minus button hover
    minusButton.addEventListener('mouseover', function () {
        if (parseInt(this.nextElementSibling.textContent) === 1) {
            this.style.cursor = 'not-allowed'; // Change cursor to not-allowed if quantity is 1
        } else {
            this.style.cursor = 'pointer'; // Change cursor to pointer
        }
    });

    // Event listener for plus button click
    plusButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        increaseQuantity(this); // Increase quantity
    });

    // Event listener for trash button click
    trashButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        removeCartItem(this); // Remove cart item
    });
}

// Function to decrease quantity
function decreaseQuantity(button) {
    let quantityElement = button.nextElementSibling; // Get the quantity element
    let currentQuantity = parseInt(quantityElement.textContent); // Get the current quantity

    if (currentQuantity > 1) {
        let newQuantity = currentQuantity - 1; // Decrease quantity by 1
        quantityElement.textContent = newQuantity; // Update quantity display
        updateItemPrice(button, newQuantity); // Update item price
        updateCartData(); // Update cart data
    }
}

// Function to increase quantity
function increaseQuantity(button) {
    let quantityElement = button.previousElementSibling; // Get the quantity element
    let currentQuantity = parseInt(quantityElement.textContent); // Get the current quantity

    let newQuantity = currentQuantity + 1; // Increase quantity by 1
    quantityElement.textContent = newQuantity; // Update quantity display
    updateItemPrice(button, newQuantity); // Update item price
    updateCartData(); // Update cart data
}

// Function to update item price based on new quantity
function updateItemPrice(button, newQuantity) {
    let cartItem = button.closest('.cart-item'); // Get the closest cart item element
    let priceElement = cartItem.querySelector('.item-price'); // Get the price element
    let pricePerUnit = parseFloat(priceElement.dataset.pricePerUnit); // Get the price per unit
    let newPrice = pricePerUnit * newQuantity; // Calculate the new price
    priceElement.textContent = newPrice.toFixed(2) + '€'; // Update price display
    updateCartData(); // Update cart data
}

// Function to revert quantity display back to original state
function revertQuantityDisplay(display) {
    let quantityElement = display.querySelector('.quantity'); // Get the quantity element
    let quantity = quantityElement.textContent; // Get the current quantity

    // Update the quantity display to show original state
    display.parentNode.innerHTML = `
        <div class="quantity-display">
            <button class="quantity-toggle">
                ${quantity} <i class="fas fa-chevron-down"></i>
            </button>
        </div>
    `;
    attachEventListeners(); // Re-attach event listeners to the quantity toggle
    updateCartData(); // Update cart data
}

// Function to remove cart item
function removeCartItem(button) {
    let cartItem = button.closest('.cart-item'); // Get the closest cart item element
    cartItem.remove(); // Remove the cart item from DOM
    updateCartData(); // Update cart data
}

// Function to update cart data (total price, etc.)
function updateCartData() {
    let cartItems = [];
    let total = 0;

    // Loop through each cart item and update total price
    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const name = cartItem.querySelector('.item-details p').textContent;
        const quantity = parseInt(cartItem.querySelector('.quantity-toggle').textContent.trim());
        const pricePerUnit = parseFloat(cartItem.querySelector('.item-price').dataset.pricePerUnit);
        const image = cartItem.querySelector('.item-image img').src;
        const commentElement = cartItem.querySelector('.comment-textarea');
        const comment = commentElement ? commentElement.value : '';

        const itemTotalPrice = pricePerUnit * quantity;
        total += itemTotalPrice; // Add item total price to the overall total
        cartItems.push({
            name: name,
            price: itemTotalPrice,
            quantity: quantity,
            image: image,
            comment: comment
        });
    });

    const tipAmount = parseFloat(document.querySelector('input[name="tipAmount"]:checked').value) || 0; // Get the selected tip amount
    total += tipAmount; // Add tip amount to the total

    total += parseFloat(window.deliveryFee); // Add delivery fee to the total

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save cart items to localStorage
    localStorage.setItem('totalPrice', total.toFixed(2)); // Save total price to localStorage

    document.querySelector('.order-summary p').textContent = `Total: ${total.toFixed(2)} €`; // Update total price display
}