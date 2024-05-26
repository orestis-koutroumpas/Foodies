// Select arrow icons and tabs box elements
export const arrowIcons = document.querySelectorAll(".icon i");
export const tabsBox = document.querySelector(".tabs-box");

// Select all tabs within the tabs box, if the tabs box exists
export const allTabs = tabsBox ? tabsBox.querySelectorAll(".tab") : null;

// Variable to track if dragging is in progress
export let isDragging = false;

// Array to store tab data
export let tabsData = [];

// Array defining category priority for sorting
const categoryPriority = [
    'Coffees', 'Teas', 'Starters', 'Salads', 'Fries', 'Pizza', 'Vegan Pizza',
    'Pasta', 'Burger', 'Vegan Burger', 'Sandwiches', 'Vegan Sandwiches',
    'Sweet Loukoumades', 'Savory Loukoumades', 'Sweet Pancakes', 'Savory Pancakes',
    'Sweet Waffles', 'Savory Waffles', 'Sweet Crepes', 'Savory Crepes', 'Vegan Crepes',
    'Desserts', 'Ice Cream', 'Sodas', 'Drinks', 'Beverages'
];

// Function to fetch tab data from the server for a specific store
export async function fetchTabsData(storeId) {
    try {
        const response = await fetch(`/api/tabs/${storeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle network errors
        }
        const data = await response.json();
        setTabsData(data); // Set tab data with fetched data
    } catch (error) {
        console.error('Error fetching tabs data:', error); // Log errors to console
    }
}

// Function to set tab data and sort it based on category priority
export const setTabsData = (data) => {
    tabsData = data.sort((a, b) => {
        const aIndex = categoryPriority.indexOf(a);
        const bIndex = categoryPriority.indexOf(b);
        return aIndex - bIndex; // Sort based on category priority
    });
};

// Function to get tab data
export function getTabsData() {
    return tabsData;
}

// Array to store product data
export let productsData = [];

// Function to fetch product data from the server for a specific store
export async function fetchProducts(storeId) {
    try {
        const response = await fetch(`/api/menu-items/${storeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle network errors
        }
        const data = await response.json();
        setProductsData(data); // Set product data with fetched data
    } catch (error) {
        console.error('Error fetching products data:', error); // Log errors to console
    }
}

// Function to set product data
export const setProductsData = (data) => {
    productsData = data;
};

// Function to get product data
export function getProductsData() {
    return productsData;
}

// Object to store store information
export let storeInfo = {
    id: null,
    deliveryHours: {},
    address: '',
    phone: ''
};

// Function to fetch store information from the server for a specific store name
export async function fetchStoreInfo(storeName) {
    try {
        const response = await fetch(`/api/store-info/${storeName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle network errors
        }
        const info = await response.json();
        setStoreInfo(info); // Set store information with fetched data
    } catch (error) {
        console.error('Error fetching store info:', error); // Log errors to console
    }
}

// Function to set store information
function setStoreInfo(info) {
    storeInfo = {
        id: info.id, // Set the id
        deliveryHours: info.deliveryHours,
        address: info.address,
        phone: info.phone
    };
}

// Function to get store information
export function getStoreInfo() {
    return storeInfo;
}

// Function to get the dragging status
export function getIsDragging() {
    return isDragging;
}

// Function to set the dragging status
export function setIsDragging(value) {
    isDragging = value;
}
