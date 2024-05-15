
export const arrowIcons = document.querySelectorAll(".icon i");
export const tabsBox = document.querySelector(".tabs-box");
export const allTabs = tabsBox ? tabsBox.querySelectorAll(".tab") : null;
export let isDragging = false;

export const tabsData = [
    "ΚΑΦΕΔΕΣ",
    "ΡΟΦΗΜΑΤΑ",
    "VEGAN / ΝΗΣΤΙΣΙΜΟΙ ΛΟΥΚΟΥΜΑΔΕΣ",
    "MY LOUKOUMADES",
    "ΑΛΜΥΡΟΙ ΛΟΥΚΟΥΜΑΔΕΣ",
    "ΓΛΥΚΟΙ ΛΟΥΚΟΥΜΑΔΕΣ",
    "SWEET BURGER",
    "MY PANCAKES",
    "PANCAKES ΑΛΜΥΡΑ",
    "PANCAKES ΓΛΥΚΑ",
    "MY WAFFLE",
    "ΒΑΦΛΑΚΙΑ ΓΛΥΚΑ",
    "ΒΑΦΛΑΚΙΑ ΑΛΜΥΡΑ",
    "ΓΛΥΚΑ",
    "ΠΑΓΩΤΟ",
    "ΑΝΑΨΥΚΤΙΚΑ"
];

export let productsData = [];

export function fetchProducts(callback) {
    fetch('/products')
        .then(response => response.json())
        .then(data => {
            productsData = data;
            callback();
        })
        .catch(error => console.error('Error:', error));
}

export const locationCoordinates = {
    lat: 38.246719,
    lng: 21.743356
};

export const storeInfo = {
    deliveryHours: {
        'Δευτέρα': '9:00  - 22:00 ',
        'Τρίτη': '9:00  - 22:00 ',
        'Τετάρτη': '9:00  - 22:00 ',
        'Πέμπτη': '9:00  - 22:00 ',
        'Παρασκευή': '9:00  - 22:00 ',
        'Σάββατο': '9:00  - 00:00 ',
        'Κυριακή': '9:00  - 23:00 '
    },
    address: 'Αγίου Ανδρέου 12, Πάτρα',
    phone: '+30 - 6948756392'
};

export function getIsDragging() {
    return isDragging;
}

export function setIsDragging(value) {
    isDragging = value;
}