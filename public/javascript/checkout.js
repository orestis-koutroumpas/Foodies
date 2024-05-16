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

    function decreaseQuantity(button) {
        let quantityElement = button.nextElementSibling;
        let currentQuantity = parseInt(quantityElement.textContent);
        
        if (currentQuantity > 0) {
            let newQuantity = currentQuantity - 1;
            quantityElement.textContent = newQuantity;
        }
    }

    function increaseQuantity(button) {
        let quantityElement = button.previousElementSibling;
        let currentQuantity = parseInt(quantityElement.textContent);
        
        let newQuantity = currentQuantity + 1;
        quantityElement.textContent = newQuantity;
    }
});
