// public/javascript/checkout.js

// Adds event listeners to + and - buttons in checkout page
document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons with class 'minus' and add event listener for decreasing quantity
    let minusButtons = document.querySelectorAll('.quantity-button.minus');
    minusButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            decreaseQuantity(this);
        });
    });

    // Select all buttons with class 'plus' and add event listener for increasing quantity
    let plusButtons = document.querySelectorAll('.quantity-button.plus');
    plusButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            increaseQuantity(this);
        });
    });

    // Function to decrease the quantity when the minus button is clicked
    function decreaseQuantity(button) {
        // Get the element displaying the quantity
        let quantityElement = button.nextElementSibling;
        // Parse the current quantity as an integer
        let currentQuantity = parseInt(quantityElement.textContent);
        
        // Ensure the quantity doesn't go below 0
        if (currentQuantity > 0) {
            let newQuantity = currentQuantity - 1;
            // Update the quantity display
            quantityElement.textContent = newQuantity;
        }
    }

    // Function to increase the quantity when the plus button is clicked
    function increaseQuantity(button) {
        // Get the element displaying the quantity
        let quantityElement = button.previousElementSibling;
        // Parse the current quantity as an integer
        let currentQuantity = parseInt(quantityElement.textContent);
        
        // Increment the quantity
        let newQuantity = currentQuantity + 1;
        // Update the quantity display
        quantityElement.textContent = newQuantity;
    }
});