// storePage/productRendering.js

import { openModal } from './modalManagement.js'; // Import the openModal function from modalManagement
import { fetchProducts, productsData, tabsData } from './data.js'; // Import necessary functions and data from data.js

// Function to render all products for a given store
export async function renderAllProducts(storeId) {
    // Fetch products data for the given store
    await fetchProducts(storeId);

    // Generate sections based on the tabsData (categories)
    generateSections();

    // Render products in the appropriate sections
    renderProductsByCategory();
}

// Function to generate sections for each category
function generateSections() {
    const categoriesContainer = document.querySelector('.categories-container'); // Get the categories container element
    tabsData.forEach((tab, index) => {
        const sectionId = `category-${index + 1}`; // Generate a unique section ID
        const section = document.createElement('section'); // Create a new section element
        section.id = sectionId; // Set the section ID
        section.classList.add('menu-items'); // Add class to section

        const h2 = document.createElement('h2'); // Create an h2 element for the category name
        h2.classList.add('category-name'); // Add class to h2
        h2.textContent = tab; // Set the category name as text
        section.appendChild(h2); // Append h2 to the section

        const productsGrid = document.createElement('div'); // Create a div for the products grid
        productsGrid.classList.add('products-grid'); // Add class to products grid
        productsGrid.id = `products-container-${index + 1}`; // Set a unique ID for the products grid
        section.appendChild(productsGrid); // Append the products grid to the section

        categoriesContainer.appendChild(section); // Append the section to the categories container
    });
}

// Function to render products in a given container
export function renderProducts(container, products) {
    products.forEach(product => {
        const productElement = createProductElement(product); // Create a product element
        container.appendChild(productElement); // Append the product element to the container
    });
}

// Function to render products by category
function renderProductsByCategory() {
    const categoryMap = tabsData.reduce((acc, tab, index) => {
        acc[tab] = `products-container-${index + 1}`; // Map each category to its respective container ID
        return acc;
    }, {});

    productsData.forEach((product) => {
        const containerId = categoryMap[product.category]; // Get the container ID for the product's category
        if (containerId) {
            renderProduct(containerId, product); // Render the product in the appropriate container
        }
    });
}

// Function to render a single product in a given container
function renderProduct(containerId, product) {
    const productsContainer = document.getElementById(containerId); // Get the products container element by ID
    const productElement = createProductElement(product); // Create a product element
    productsContainer.appendChild(productElement); // Append the product element to the container
}

// Function to create a product element
function createProductElement(product) {
    const productElement = document.createElement('div'); // Create a div element for the product
    productElement.classList.add('product'); // Add class to product element

    const productInfo = document.createElement('div'); // Create a div for product info
    productInfo.classList.add('product-info'); // Add class to product info
    productInfo.innerHTML = `<h3>${product.name}</h3>`; // Set product name
    productElement.appendChild(productInfo); // Append product info to product element

    const price = parseFloat(product.price); // Parse product price to float
    const formattedPrice = `${price.toFixed(2)} €`; // Format price

    const priceElement = document.createElement('p'); // Create a p element for price
    priceElement.classList.add('product-price'); // Add class to price element
    priceElement.textContent = formattedPrice; // Set price text
    productElement.appendChild(priceElement); // Append price element to product element

    const descriptionElement = document.createElement('p'); // Create a p element for description
    descriptionElement.classList.add('product-description'); // Add class to description element
    descriptionElement.textContent = product.description; // Set description text
    productElement.appendChild(descriptionElement); // Append description element to product element

    const imgElement = document.createElement('img'); // Create an img element for product image
    imgElement.src = product.image; // Set image source
    imgElement.alt = product.name; // Set alt text
    productElement.appendChild(imgElement); // Append image element to product element

    const buttonElement = document.createElement('div'); // Create a div for add-to-cart button
    buttonElement.classList.add('add-to-cart'); // Add class to button
    buttonElement.innerHTML = '<i class="fa-regular fa-square-plus fa-xl"></i>'; // Set button icon
    buttonElement.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent event propagation
        openModal(product); // Open modal with product details
    });
    productElement.appendChild(buttonElement); // Append button to product element

    // Add event listener to open modal when clicking on the product element
    productElement.addEventListener('click', function() {
        openModal(product); // Open modal with product details
    });

    return productElement; // Return the created product element
}
