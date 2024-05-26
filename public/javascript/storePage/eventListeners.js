// Import functions from tabsManagement module
import { handleScroll, updateActiveTab, autoScrollToActiveTab } from './tabsManagement.js';
import { handleIconClick, handleTabClick, scrollToSection, dragging, dragStop } from './tabsManagement.js';

// Import data and elements from data module
import { arrowIcons, tabsBox, allTabs, isDragging } from './data.js';

// Function to initialize the tab functionality
export function initialize() {
    toggleSearch('search-bar', 'search-button'); // Initialize search bar toggle functionality
    autoScrollToActiveTab(); // Automatically scroll to the active tab
    updateActiveTab(); // Update the active tab based on the current scroll position
    addEventListeners(); // Add event listeners for user interactions
}

// Function to add event listeners for various user interactions
function addEventListeners() {
    // Add click event listeners to arrow icons for tab scrolling
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => handleIconClick(icon));
    });

    // Add click event listeners to all tabs
    allTabs.forEach(tab => {
        tab.addEventListener("click", () => handleTabClick(tab)); // Handle tab click to activate tab
        tab.addEventListener('click', scrollToSection); // Scroll to the corresponding section
    });

    // Add event listeners for dragging functionality on the tabs box
    tabsBox.addEventListener("mousedown", () => isDragging = true); // Set isDragging to true on mouse down
    tabsBox.addEventListener("mousemove", dragging); // Handle dragging on mouse move
    document.addEventListener("mouseup", dragStop); // Stop dragging on mouse up

    // Add scroll event listeners to handle scroll and update active tab
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveTab);
}

// Function to toggle the visibility of the search bar
function toggleSearch(search, button) {
    const searchBar = document.getElementById(search); // Get the search bar element
    const searchButton = document.getElementById(button); // Get the search button element

    // Add click event listener to the search button
    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('show-search'); // Toggle the 'show-search' class on the search bar
    });
}
