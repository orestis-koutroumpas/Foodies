// public/javascript/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const tipRadios = document.querySelectorAll('input[name="tipAmount"]');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const modal = document.getElementById('placeOrderModal');
    const redirectToHomeBtn = document.getElementById('redirectToHomeBtn');

    if (cartItems.length > 0) {
        const cartItemsContainer = document.querySelector('.cart-items-container');
        cartItemsContainer.innerHTML = ''; // Clear the container before appending items

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

            cartItemsContainer.appendChild(cartItem);

            // Attach comment listeners only if there is a comment
            if (item.comment) {
                attachCommentListeners(cartItem, item);
            }
        });

        attachEventListeners();
        updateCartData();

        // Add event listeners to the tip radio buttons
        tipRadios.forEach(radio => {
            radio.addEventListener('change', updateCartData);
        });

    } else {
        console.error('No cart items found.');
    }

    placeOrderBtn.addEventListener('click', function () {
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

        console.log(cartItems); // You can handle this array as needed

        modal.style.display = 'flex';
    });

    redirectToHomeBtn.addEventListener('click', function () {
        window.location.href = '/home';
    });
});

function attachCommentListeners(cartItem, item) {
    const infoIcon = cartItem.querySelector('.info-icon');
    const commentContainer = cartItem.querySelector('.comment-container');
    const saveCommentButton = commentContainer.querySelector('.save-comment button');

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

    saveCommentButton.addEventListener('click', () => {
        const newComment = commentContainer.querySelector('.comment-textarea').value;
        item.comment = newComment;
        commentContainer.classList.remove('visible');
        updateCartData();
    });

    document.addEventListener('click', (event) => {
        if (!commentContainer.contains(event.target) && !infoIcon.contains(event.target)) {
            commentContainer.classList.remove('visible');
        }
    });
}

function attachEventListeners() {
    const quantityToggles = document.querySelectorAll('.quantity-toggle');

    quantityToggles.forEach(toggle => {
        toggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent immediate reversion
            toggleQuantityControls(this);
        });
    });

    document.addEventListener('click', function (event) {
        const expandedControls = document.querySelectorAll('.quantity-controls');
        expandedControls.forEach(control => {
            if (!control.contains(event.target)) {
                revertQuantityDisplay(control);
            }
        });
    });
}

function toggleQuantityControls(toggle) {
    const cartItem = toggle.closest('.cart-item');
    const quantity = parseInt(toggle.textContent);

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

    attachQuantityButtonListeners(cartItem);
}

function attachQuantityButtonListeners(cartItem) {
    const minusButton = cartItem.querySelector('.quantity-button.minus');
    const plusButton = cartItem.querySelector('.quantity-button.plus');
    const trashButton = cartItem.querySelector('.quantity-button.trash');

    minusButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        decreaseQuantity(this);
    });

    minusButton.addEventListener('mouseover', function () {
        if (parseInt(this.nextElementSibling.textContent) === 1) {
            this.style.cursor = 'not-allowed';
        } else {
            this.style.cursor = 'pointer';
        }
    });

    plusButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        increaseQuantity(this);
    });

    trashButton.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from propagating to document
        removeCartItem(this);
    });
}

function decreaseQuantity(button) {
    let quantityElement = button.nextElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 1) {
        let newQuantity = currentQuantity - 1;
        quantityElement.textContent = newQuantity;
        updateItemPrice(button, newQuantity);
        updateCartData();
    }
}

function increaseQuantity(button) {
    let quantityElement = button.previousElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent);

    let newQuantity = currentQuantity + 1;
    quantityElement.textContent = newQuantity;
    updateItemPrice(button, newQuantity);
    updateCartData();
}

function updateItemPrice(button, newQuantity) {
    let cartItem = button.closest('.cart-item');
    let priceElement = cartItem.querySelector('.item-price');
    let pricePerUnit = parseFloat(priceElement.dataset.pricePerUnit);
    let newPrice = pricePerUnit * newQuantity;
    priceElement.textContent = newPrice.toFixed(2) + '€';
    updateCartData();
}

function revertQuantityDisplay(display) {
    let quantityElement = display.querySelector('.quantity');
    let quantity = quantityElement.textContent;

    display.parentNode.innerHTML = `
        <div class="quantity-display">
            <button class="quantity-toggle">
                ${quantity} <i class="fas fa-chevron-down"></i>
            </button>
        </div>
    `;
    attachEventListeners();
    updateCartData();
}

function removeCartItem(button) {
    let cartItem = button.closest('.cart-item');
    cartItem.remove();
    updateCartData();
}

function updateCartData() {
    let cartItems = [];
    let total = 0;

    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const name = cartItem.querySelector('.item-details p').textContent;
        const quantity = parseInt(cartItem.querySelector('.quantity-toggle').textContent.trim());
        const pricePerUnit = parseFloat(cartItem.querySelector('.item-price').dataset.pricePerUnit);
        const image = cartItem.querySelector('.item-image img').src;
        const commentElement = cartItem.querySelector('.comment-textarea');
        const comment = commentElement ? commentElement.value : '';

        const itemTotalPrice = pricePerUnit * quantity;
        total += itemTotalPrice;
        cartItems.push({
            name: name,
            price: itemTotalPrice,
            quantity: quantity,
            image: image,
            comment: comment
        });
    });

    const tipAmount = parseFloat(document.querySelector('input[name="tipAmount"]:checked').value) || 0;
    total += tipAmount;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', total.toFixed(2));

    document.querySelector('.order-summary p').textContent = `Total: ${total.toFixed(2)} €`;
}
