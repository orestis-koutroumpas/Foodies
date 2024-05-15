import { openModal } from './modalManagement.js';
import { productsData, tabsData } from './data.js';

export function generateSections() {
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

export function renderProducts(containerId, products) {
    const productsContainer = document.getElementById(containerId);
    products.forEach((product) => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
}

export function renderAllProducts() {
    tabsData.forEach((_, index) => {
        const containerId = `products-container-${index + 1}`;
        renderProducts(containerId, productsData);
    });
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    productInfo.innerHTML = `<h3>${product.name}</h3>`;
    productElement.appendChild(productInfo);

    const priceElement = document.createElement('p');
    priceElement.classList.add('product-price');
    priceElement.textContent = `$${product.price.toFixed(2)}`;
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
    buttonElement.addEventListener('click', function() {
        openModal(product);
    });
    productElement.appendChild(buttonElement);

    return productElement;
}
