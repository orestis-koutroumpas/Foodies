// Function to handle modal scroll event
function handleModalScroll(modalImage, modalContent, modalHeader, modalHeaderH1, modalInfoH1) {
    if (modalImage.getBoundingClientRect().bottom - modalContent.scrollTop <= modalHeader.offsetHeight) {
        modalHeader.style.visibility = 'visible';
        modalHeader.style.height = '65px';
        modalHeader.style.display = 'flex';
    } else {
        modalHeader.style.visibility = 'hidden';
        modalHeader.style.height = '0';
        modalHeader.style.display = 'none';
    }

    const relativePosition = modalInfoH1.getBoundingClientRect().top - modalHeader.getBoundingClientRect().bottom;
    if (relativePosition <= 0) {
        modalHeaderH1.style.opacity = '1';
        modalHeaderH1.style.visibility = 'visible';
        modalHeaderH1.style.fontSize = '1em';
        modalHeaderH1.style.fontWeight = 'normal';
        modalHeaderH1.style.textAlign = 'center';
    } else {
        modalHeaderH1.style.opacity = '0';
        modalHeaderH1.style.visibility = 'hidden';
    }
}

// Function to update total price
function updateTotalPrice(modalPrice, quantitySpan, totalPrice) {
    const price = parseFloat(parseFloat(modalPrice.textContent) * parseInt(quantitySpan.textContent));
    totalPrice.textContent = `${price.toFixed(2)} €`;
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
        modal.classList.add('open');

        var overlay = document.createElement('div');
        overlay.id = 'overlay';
        document.body.appendChild(overlay);

        setTimeout(() => {
            modal.style.opacity = 1;
        }, 0);
    }

    if (modalBackdrop) {
        modalBackdrop.classList.add('open');
    }

    const price = parseFloat(product.price);
    const formattedPrice = `${price.toFixed(2)} €`;

    modalHeaderH1.textContent = product.name;
    modalInfoH1.textContent = product.name;
    document.body.style.overflow = 'hidden';
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = formattedPrice;

    modalComment.value = '';
    // Check localStorage for saved quantity and total price
    const savedState = JSON.parse(localStorage.getItem(`product-${product.id}`));
    if (savedState) {
        quantitySpan.textContent = savedState.quantity;
        totalPrice.textContent = savedState.totalPrice;
    } else {
        quantitySpan.textContent = '1';
        totalPrice.textContent = formattedPrice;
    }

    // Update total price when quantity changes
    quantitySpan.addEventListener('input', function () {
        const quantity = parseInt(this.textContent);
        const price = product.price * quantity;
        totalPrice.textContent = `${price.toFixed(2)} €`;
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
        closeModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target.id === 'overlay') {
            const quantity = parseInt(quantitySpan.textContent);
            const price = product.price * quantity;
            localStorage.setItem(`product-${product.id}`, JSON.stringify({
                quantity: quantity,
                totalPrice: `${price.toFixed(2)} €`
            }));
            closeModal();
        }
    });
}

// Function to close the modal
export function closeModal() {
    const modal = document.querySelector('.menu-item-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (modal) {
        modal.style.opacity = 0;
        setTimeout(() => {
            modal.classList.remove('open');
            const overlay = document.getElementById('overlay');
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
    }

    if (modalBackdrop) {
        modalBackdrop.classList.remove('open');
    }

    document.body.style.overflow = '';
}

// Function to get product details from the modal
export function getProductDetails() {
    const modalHeaderH1 = document.querySelector('#product-name-header');
    const totalPrice = document.getElementById('total-price');
    const modalComment = document.getElementById('comment');
    const quantitySpan = document.getElementById('quantity');
    const modalImage = document.getElementById('product-image');

    return {
        productName: modalHeaderH1.textContent,
        quantity: quantitySpan.textContent,
        finalPrice: totalPrice.textContent,
        comment: modalComment.value,
        image: modalImage.src
    };
}

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

    quantityMinus.style.display = 'none';

    addToCartButton.addEventListener('click', () => {
        addToCartButton.classList.add('active');
        setTimeout(() => addToCartButton.classList.remove('active'), 3000);
    });

    quantityMinus.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
        if (quantity === 1) {
            quantityMinus.style.display = 'none';
        }
        updateTotalPrice(modalPrice, quantitySpan, totalPrice);
    });

    quantityPlus.addEventListener('click', () => {
        let quantity = parseInt(quantitySpan.textContent);
        quantity++;
        quantitySpan.textContent = quantity;
        quantityMinus.style.display = 'inline';
        updateTotalPrice(modalPrice, quantitySpan, totalPrice);
    });

    const closeIcon = document.querySelector('.close-icon');
    closeIcon.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        const overlay = document.getElementById('overlay');
        if (event.target === overlay) {
            closeModal();
        }
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.modal-header');
        const rect = header.getBoundingClientRect();
        if (rect.top <= 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
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
