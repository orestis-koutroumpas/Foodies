// Function to handle modal scroll event
function handleModalScroll(modalImage, modalContent, modalHeader, modalHeaderH1, modalInfoH1) {
    // Check if the modal image bottom is within the modal header height
    if (modalImage.getBoundingClientRect().bottom - modalContent.scrollTop <= modalHeader.offsetHeight) {
        modalHeader.style.visibility = 'visible'; // Show modal header
        modalHeader.style.height = '65px'; // Set header height
        modalHeader.style.display = 'flex'; // Set display to flex
    } else {
        modalHeader.style.visibility = 'hidden'; // Hide modal header
        modalHeader.style.height = '0'; // Set header height to 0
        modalHeader.style.display = 'none'; // Hide header display
    }

    // Check the relative position of modalInfoH1 to modalHeader
    const relativePosition = modalInfoH1.getBoundingClientRect().top - modalHeader.getBoundingClientRect().bottom;
    if (relativePosition <= 0) {
        modalHeaderH1.style.opacity = '1'; // Make header text visible
        modalHeaderH1.style.visibility = 'visible'; // Show header text
        modalHeaderH1.style.fontSize = '1em'; // Set font size
        modalHeaderH1.style.fontWeight = 'normal'; // Set font weight
        modalHeaderH1.style.textAlign = 'center'; // Center align text
    } else {
        modalHeaderH1.style.opacity = '0'; // Hide header text
        modalHeaderH1.style.visibility = 'hidden'; // Hide header text
    }
}

// Function to update total price based on quantity
function updateTotalPrice(modalPrice, quantitySpan, totalPrice) {
    const price = parseFloat(parseFloat(modalPrice.textContent) * parseInt(quantitySpan.textContent));
    totalPrice.textContent = `${price.toFixed(2)} €`; // Update total price display
}

// Function to open the modal
export function openModal(product) {
    const modal = document.querySelector('.menu-item-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalHeaderH1 = document.querySelector('#product-name-header');
    const modalInfoH1 = document.querySelector('#product-name');
    const modalImage = document.getElementById('product-image');
    const modalName = document.getElementById('product-name');
    const modalDescription = document.getElementById('product-description');
    const modalPrice = document.getElementById('product-price');  
    const quantitySpan = document.getElementById('quantity');
    const totalPrice = document.getElementById('total-price');
    const modalComment = document.getElementById('comment');

    if (modal) {
        modal.classList.add('open'); // Open the modal

        var overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay); // Append overlay to body

        setTimeout(() => {
            modal.style.opacity = 1; // Fade in modal
        }, 0);
    }

    if (modalBackdrop) {
        modalBackdrop.classList.add('open'); // Show modal backdrop
    }

    const price = parseFloat(product.price);
    const formattedPrice = `${price.toFixed(2)} €`;

    modalHeaderH1.textContent = product.name; // Set product name in modal header
    modalInfoH1.textContent = product.name; // Set product name in modal info
    document.body.style.overflow = 'hidden'; // Disable body scroll
    modalImage.src = product.image; // Set product image
    modalImage.alt = product.name; // Set image alt text
    modalName.textContent = product.name; // Set product name
    modalDescription.textContent = product.description; // Set product description
    modalPrice.textContent = formattedPrice; // Set product price

    modalComment.value = ''; // Clear comment input
    // Check localStorage for saved quantity and total price
    const savedState = JSON.parse(localStorage.getItem(`product-${product.id}`));
    if (savedState) {
        quantitySpan.textContent = savedState.quantity; // Set saved quantity
        totalPrice.textContent = savedState.totalPrice; // Set saved total price
    } else {
        quantitySpan.textContent = '1'; // Default quantity to 1
        totalPrice.textContent = formattedPrice; // Default total price
    }

    // Update total price when quantity changes
    quantitySpan.addEventListener('input', function () {
        const quantity = parseInt(this.textContent);
        const price = product.price * quantity;
        totalPrice.textContent = `${price.toFixed(2)} €`; // Update total price display
    });

    // Save state to localStorage when modal is closed
    const closeModalButton = document.querySelector('.close-icon');
    closeModalButton.addEventListener('click', () => {
        const quantity = parseInt(quantitySpan.textContent);
        const price = product.price * quantity;
        localStorage.setItem(`product-${product.id}`, JSON.stringify({
            quantity: quantity,
            totalPrice: `${price.toFixed(2)} €`
        }));
        closeModal(); // Close modal
    });

    window.addEventListener('click', (event) => {
        if (event.target.id === 'overlay') {
            const quantity = parseInt(quantitySpan.textContent);
            const price = product.price * quantity;
            localStorage.setItem(`product-${product.id}`, JSON.stringify({
                quantity: quantity,
                totalPrice: `${price.toFixed(2)} €`
            }));
            closeModal(); // Close modal if overlay is clicked
        }
    });
}

// Function to close the modal
export function closeModal() {
    const modal = document.querySelector('.menu-item-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
        modal.style.opacity = 0; // Fade out modal
        setTimeout(() => {
            modal.classList.remove('open'); // Remove open class from modal
            const overlay = document.getElementById('overlay');
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay); // Remove overlay from DOM
            }
        }, 500);
    }

    if (modalBackdrop) {
        modalBackdrop.classList.remove('open'); // Hide modal backdrop
    }

    document.body.style.overflow = ''; // Enable body scroll
}

// Function to get product details from the modal
export function getProductDetails() {
    const modalHeaderH1 = document.querySelector('#product-name-header');
    const totalPrice = document.getElementById('total-price');
    const modalComment = document.getElementById('comment');
    const quantitySpan = document.getElementById('quantity');
    const modalImage = document.getElementById('product-image');

    return {
        productName: modalHeaderH1.textContent, // Get product name
        quantity: quantitySpan.textContent, // Get product quantity
        finalPrice: totalPrice.textContent, // Get final price
        comment: modalComment.value, // Get comment
        image: modalImage.src // Get product image
    };
}

// Function to setup modal and event listeners
export function setupModal() {
    const modal = document.querySelector('.menu-item-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalImage = document.getElementById('product-image');
    const modalHeader = modal.querySelector('.modal-header');
    const modalHeaderH1 = modalHeader.querySelector('#product-name-header');
    const modalInfoH1 = modal.querySelector('#product-name');

    modalContent.addEventListener('scroll', () => handleModalScroll(modalImage, modalContent, modalHeader, modalHeaderH1, modalInfoH1));

    const quantityMinus = document.querySelector('.fa-minus');
    const quantityPlus = document.querySelector('.fa-plus');
    const addToCartButton = document.querySelector('.modal-footer .btn');
    const quantitySpan = document.getElementById('quantity');
    const totalPrice = document.getElementById('total-price');
    const modalPrice = document.getElementById('product-price');

    quantityMinus.style.display = 'none'; // Hide minus button if quantity is 1

    // Event listener for add to cart button click
    addToCartButton.addEventListener('click', () => {
        addToCartButton.classList.add('active');
        setTimeout(() => addToCartButton.classList.remove('active'), 3000);
    });

    // Event listener for quantity decrease button click
    quantityMinus.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity; // Update quantity
        }
        if (quantity === 1) {
            quantityMinus.style.display = 'none'; // Hide minus button if quantity is 1
        }
        updateTotalPrice(modalPrice, quantitySpan, totalPrice); // Update total price
    });

    // Event listener for quantity increase button click
    quantityPlus.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity; // Update quantity
        quantityMinus.style.display = 'inline'; // Show minus button
        updateTotalPrice(modalPrice, quantitySpan, totalPrice); // Update total price
    });

    // Event listener for close modal button click
    const closeIcon = document.querySelector('.close-icon');
    closeIcon.addEventListener('click', closeModal);

    // Event listener for overlay click to close modal
    window.addEventListener('click', (event) => {
        const overlay = document.getElementById('overlay');
        if (event.target === overlay) {
            closeModal();
        }
    });

    // Event listener for window scroll to add sticky class to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.modal-header');
        const rect = header.getBoundingClientRect();
        if (rect.top <= 0) {
            header.classList.add('sticky'); // Add sticky class
        } else {
            header.classList.remove('sticky'); // Remove sticky class
        }
    });

    return openModal;
}














// Function to update ingredients list
// export function updateIngredientsList(product, modalIngredients) {
//     modalIngredients.innerHTML = '';
//     for (const key in product) {
//         if (key === 'name' || key === 'price' || key === 'image' || key === 'description') {
//             continue;
//         }

//         const li = document.createElement('li');
//         const header = document.createElement('h3');
//         header.textContent = key;
//         li.appendChild(header);

//         if (typeof product[key] === 'object') {
//             const ul = document.createElement('ul');
//             for (const subKey in product[key]) {
//                 const subLi = document.createElement('li');
//                 subLi.className = 'flex-container';
//                 const checkbox = document.createElement('input');
//                 checkbox.type = 'checkbox';
//                 checkbox.id = `${key}-${subKey}`;
//                 checkbox.name = `${key}-${subKey}`;
//                 checkbox.className = 'checkbox-margin';
//                 const label = document.createElement('label');
//                 label.htmlFor = `${key}-${subKey}`;
//                 label.textContent = subKey;

//                 const divLeft = document.createElement('div');
//                 divLeft.className = 'flex-container-left';
//                 divLeft.appendChild(checkbox);
//                 divLeft.appendChild(label);

//                 const divRight = document.createElement('div');
//                 divRight.className = 'flex-container-right';
//                 divRight.textContent = `${product[key][subKey].toFixed(2)} €`;

//                 subLi.appendChild(divLeft);
//                 subLi.appendChild(divRight);
//                 ul.appendChild(subLi);
//             }
//             li.appendChild(ul);
//         } else {
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             checkbox.id = key;
//             checkbox.name = key;
//             checkbox.className = 'checkbox-margin';
//             const label = document.createElement('label');
//             label.htmlFor = key;
//             label.textContent = key;

//             const divLeft = document.createElement('div');
//             divLeft.className = 'flex-container-left';
//             divLeft.appendChild(checkbox);
//             divLeft.appendChild(label);

//             li.appendChild(divLeft);
//         }

//         modalIngredients.appendChild(li);
//     }
// }
