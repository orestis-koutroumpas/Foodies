
export const arrowIcons = document.querySelectorAll(".icon i");
export const tabsBox = document.querySelector(".tabs-box");
export const allTabs = tabsBox ? tabsBox.querySelectorAll(".tab") : null;
export let isDragging = false;


export let tabsData = [];

const categoryPriority = [
    'Coffees',
    'Teas',
    'Starters',
    'Salads',
    'Fries',
    'Pizza',
    'Vegan Pizza',
    'Pasta',
    'Burger',
    'Vegan Burger',
    'Sandwiches',
    'Vegan Sandwiches',
    'Sweet Loukoumades',
    'Savory Loukoumades',
    'Sweet Pancakes',
    'Savory Pancakes',
    'Sweet Waffles',
    'Savory Waffles',
    'Sweet Crepes',
    'Savory Crepes',
    'Vegan Crepes',
    'Desserts',
    'Ice Cream',
    'Sodas',
    'Drinks',
    'Beverages'
];


export async function fetchTabsData(storeId) {
    try {
        const response = await fetch(`/api/tabs/${storeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTabsData(data);
    } catch (error) {
        console.error('Error fetching tabs data:', error);
    }
}

export const setTabsData = (data) => {
    tabsData = data.sort((a, b) => {
        const aIndex = categoryPriority.indexOf(a);
        const bIndex = categoryPriority.indexOf(b);
        return aIndex - bIndex;
    });
};

export function getTabsData() {
    return tabsData;
}


export let productsData = [];

export async function fetchProducts(storeId) {
    try {
        const response = await fetch(`/api/menu-items/${storeId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsData(data);
    } catch (error) {
        console.error('Error fetching products data:', error);
    }
}

export const setProductsData = (data) => {
    productsData = data;
};

export function getProductsData() {
    return productsData;
}


export let storeInfo = {
    id: null,
    deliveryHours: {},
    address: '',
    phone: ''
};

export async function fetchStoreInfo(storeName) {
    try {
        const response = await fetch(`/api/store-info/${storeName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const info = await response.json();
        setStoreInfo(info);
    } catch (error) {
        console.error('Error fetching store info:', error);
    }
}

function setStoreInfo(info) {
    storeInfo = {
        id: info.id, // Set the id
        deliveryHours: info.deliveryHours,
        address: info.address,
        phone: info.phone
    };
}

export function getStoreInfo() {
    return storeInfo;
}

export function getIsDragging() {
    return isDragging;
}

export function setIsDragging(value) {
    isDragging = value;
}