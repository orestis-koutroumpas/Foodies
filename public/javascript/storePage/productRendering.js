// storePage/productRendering.js

import { openModal } from './modalManagement.js';
import { fetchProducts, productsData, tabsData } from './data.js';

export async function renderAllProducts(storeId) {
    // Fetch products data for the given store
    await fetchProducts(storeId);

    // Generate sections based on the tabsData (categories)
    generateSections();

    // Render products in the appropriate sections
    renderProductsByCategory();
}

function generateSections() {
    const categoriesContainer = document.querySelector('.categories-container');
    tabsData.forEach((tab, index) => {
        const sectionId = `category-${index + 1}`;
        const section = document.createElement('section');
        section.id = sectionId;
        section.classList.add('menu-items');
        const h2 = document.createElement('h2');
        h2.classList.add('category-name');
        h2.textContent = tab;
        section.appendChild(h2);
        const productsGrid = document.createElement('div');
        productsGrid.classList.add('products-grid');
        productsGrid.id = `products-container-${index + 1}`;
        section.appendChild(productsGrid);
        categoriesContainer.appendChild(section);
    });
}

function renderProductsByCategory() {
    const categoryMap = tabsData.reduce((acc, tab, index) => {
        acc[tab] = `products-container-${index + 1}`;
        return acc;
    }, {});

    productsData.forEach((product) => {
        const containerId = categoryMap[product.category];
        if (containerId) {
            renderProduct(containerId, product);
        }
    });
}

function renderProduct(containerId, product) {
    const productsContainer = document.getElementById(containerId);
    const productElement = createProductElement(product);
    productsContainer.appendChild(productElement);
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.innerHTML = `<h3>${product.name}</h3>`;
    productElement.appendChild(productInfo);

    const price = parseFloat(product.price);
    const formattedPrice = `${price.toFixed(2)} €`;

    const priceElement = document.createElement('p');
    priceElement.classList.add('product-price');
    priceElement.textContent = formattedPrice;
    productElement.appendChild(priceElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('product-description');
    descriptionElement.textContent = product.description;
    productElement.appendChild(descriptionElement);

    const imgElement = document.createElement('img');
    imgElement.src = product.image;
    imgElement.alt = product.name;
    productElement.appendChild(imgElement);

    const buttonElement = document.createElement('div');
    buttonElement.classList.add('add-to-cart');
    buttonElement.innerHTML = '<i class="fa-regular fa-square-plus fa-xl"></i>';
    buttonElement.addEventListener('click', function(event) {
        event.stopPropagation();
        openModal(product);
    });
    productElement.appendChild(buttonElement);

    // Add event listener to open modal when clicking on the product element
    productElement.addEventListener('click', function() {
        openModal(product);
    });

    return productElement;
}