// public/javascript/storePage/productSearch.js

import { renderAllProducts } from './productRendering.js'; // Import function to render all products
import { storeInfo, tabsData } from './data.js'; // Import store information and tab data

// Function to initialize product search functionality
export const initializeProductSearch = () => {
    const searchInput = document.querySelector('.search__input'); // Get the search input element
    const categoriesContainer = document.querySelector('.categories-container'); // Get the categories container element
    const storeName = window.location.pathname.split('/')[2]; // Extract store name from URL

    // Event listener for input event on search input
    searchInput.addEventListener('input', async (event) => {
        const query = event.target.value.trim(); // Get the trimmed search query

        if (query.length > 0) {
            try {
                // Fetch products based on search query
                const response = await fetch(`/api/search-products?store=${storeName}&q=${query}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const { products, categories } = await response.json();
                    updateProductList(products, categoriesContainer, query, categories); // Update product list with search results
                } else {
                    console.error('Failed to fetch products:', response.status);
                }
            } catch (error) {
                console.error('Error searching products:', error); // Log errors to console
            }
        } else {
            // Clear search results and show default categories if query is empty
            categoriesContainer.innerHTML = '';
            const storeId = storeInfo.id;
            renderAllProducts(storeId); // Render all products for the store
        }
    });

    // Load default categories on initial page load
    const storeId = storeInfo.id;
    renderAllProducts(storeId); // Render all products for the store
};

// Function to update product list based on search results
const updateProductList = (products, container, query, categories) => {
    container.innerHTML = ''; // Clear the container

    if (products.length > 0 || categories.length > 0) {
        // Loop through categories and render products
        categories.forEach(category => {
            const section = document.createElement('section'); // Create a section element for the category
            section.classList.add('menu-items'); // Add class to section
            const h2 = document.createElement('h2'); // Create an h2 element for the category name
            h2.classList.add('category-name'); // Add class to h2
            h2.textContent = category.name; // Set category name as text
            section.appendChild(h2); // Append h2 to section

            const productsGrid = document.createElement('div'); // Create a div for the products grid
            productsGrid.classList.add('products-grid'); // Add class to products grid
            section.appendChild(productsGrid); // Append products grid to section
            container.appendChild(section); // Append section to container

            const matchingProducts = products.filter(product => product.category === category.name); // Filter products by category
            renderProducts(productsGrid, matchingProducts); // Render products in the products grid
        });
    } else {
        // Display message if no products are found
        const noProductsElement = document.createElement('div');
        noProductsElement.className = 'search-message';
        noProductsElement.innerHTML = `
            <img src="/images/stores/sad_face.gif" alt="Sad face">
            <p>No products matching "${query}" found. Please try a different search term.</p>
        `;
        container.appendChild(noProductsElement); // Append message to container
    }
};

// Function to render products in a given container
const renderProducts = (container, products) => {
    products.forEach(product => {
        const productElement = document.createElement('div'); // Create a div element for the product
        productElement.className = 'product-item'; // Add class to product element
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>${product.price} €</span>
            </div>
        `;
        container.appendChild(productElement); // Append product element to container
    });
};
