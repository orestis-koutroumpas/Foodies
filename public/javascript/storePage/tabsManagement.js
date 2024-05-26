import { fetchTabsData, getTabsData, getIsDragging, setIsDragging } from './data.js'; // Import necessary functions and data from data.js

// Function to initialize tabs management
export async function initializeTabsManagement(storeName, tabsBoxSelector) {
    // Fetch store details to get the category
    try {
        const storeDetailsResponse = await fetch(`/api/store-info/${storeName}`);
        if (!storeDetailsResponse.ok) {
            throw new Error('Network response was not ok'); // Handle network errors
        }
        const storeDetails = await storeDetailsResponse.json(); // Parse store details
        const storeId = storeDetails.id; // Extract the store ID from the store details

        // Fetch tabs data based on store category
        await fetchTabsData(storeId);

        const tabsData = getTabsData(); // Get the fetched tabs data

        generateTabs(tabsBoxSelector, tabsData); // Generate tabs using the fetched data

    } catch (error) {
        console.error('Error fetching store details or tabs data:', error); // Log errors to console
    }
}

// Function to generate tabs dynamically
function generateTabs(tabsBoxSelector, tabsData) {
    const tabsBox = document.querySelector(tabsBoxSelector); // Get the tabs box element

    // Remove all existing child elements from tabs box
    while (tabsBox.firstChild) {
        tabsBox.firstChild.remove();
    }

    // Create tabs for each category
    tabsData.forEach((tab, index) => {
        const listItem = document.createElement('li'); // Create a list item for the tab
        listItem.className = 'tab'; // Add class to list item
        if (index === 0) {
            listItem.className += ' active'; // Set the first tab as active
        }

        const link = document.createElement('a'); // Create a link element for the tab
        link.href = `#category-${index + 1}`; // Set href attribute
        link.textContent = tab; // Set the tab name as text

        listItem.appendChild(link); // Append the link to the list item
        tabsBox.appendChild(listItem); // Append the list item to the tabs box
    });
}

// Function to handle visibility of scroll icons based on scroll position
function handleIcons(scrollVal) {
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    const arrowIcons = document.querySelectorAll(".icon i"); // Get the arrow icons
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth; // Calculate the maximum scrollable width
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex"; // Show/hide left arrow icon
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex"; // Show/hide right arrow icon
}

// Function to handle click on arrow icons for scrolling
export function handleIconClick(icon) {
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340; // Scroll left or right based on icon clicked
    handleIcons(scrollWidth); // Update the visibility of arrow icons
}

// Function to handle click on a tab
export function handleTabClick(tab) {
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    tabsBox.querySelector(".active").classList.remove("active"); // Remove active class from currently active tab
    tab.classList.add("active"); // Add active class to clicked tab
}

// Function to handle dragging of tabs
export function dragging(e) {
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    if (!getIsDragging()) return; // Check if dragging is active
    tabsBox.classList.add("dragging"); // Add dragging class to tabs box
    tabsBox.scrollLeft -= e.movementX; // Adjust scroll position based on mouse movement
    handleIcons(tabsBox.scrollLeft); // Update the visibility of arrow icons
}

// Function to stop dragging
export function dragStop() {
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    setIsDragging(false); // Set dragging status to false
    tabsBox.classList.remove("dragging"); // Remove dragging class from tabs box
}

// Function to handle scroll event for the page
export function handleScroll() {
    const header = document.querySelector('header'); // Get the header element
    header.classList.toggle('scrolled', window.scrollY > 0); // Toggle scrolled class based on scroll position

    const element = document.querySelector('.menu-nav'); // Get the menu navigation element
    const menuNavBottom = element.getBoundingClientRect().bottom; // Get the bottom position of the menu navigation
    element.classList.toggle('sticky', window.scrollY > menuNavBottom); // Toggle sticky class based on scroll position
}

// Function to automatically scroll to the active tab
export function autoScrollToActiveTab() {
    const activeTab = document.querySelector('.tab.active'); // Get the active tab element
    const tabsBox = document.querySelector(".tabs-box"); // Get the tabs box element
    if (!activeTab) return;

    const activeTabLeft = activeTab.getBoundingClientRect().left; // Get the left position of the active tab
    const tabsBoxLeft = tabsBox.getBoundingClientRect().left; // Get the left position of the tabs box

    tabsBox.scrollLeft += activeTabLeft - tabsBoxLeft; // Adjust scroll position to center the active tab
}

// Function to update the active tab based on scroll position
export function updateActiveTab() {
    const sections = document.querySelectorAll('.menu-items'); // Get all menu items sections
    let currentSectionId = '';

    // Loop through sections to find the currently visible section
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Get the top position of the section
        const sectionHeight = section.clientHeight; // Get the height of the section
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
            currentSectionId = section.id; // Set the current section ID
        }
    });

    const activeTab = document.querySelector('.tab.active'); // Get the active tab element
    if (activeTab) {
        activeTab.classList.remove('active'); // Remove active class from the currently active tab
    }

    const correspondingTab = document.querySelector(`.tab a[href="#${currentSectionId}"]`); // Find the tab corresponding to the current section
    if (correspondingTab) {
        correspondingTab.parentElement.classList.add('active'); // Add active class to the corresponding tab
    }

    autoScrollToActiveTab(); // Auto scroll to the active tab
}

// Function to scroll to a specific section when a tab is clicked
export function scrollToSection(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetSectionId = event.target.getAttribute('href'); // Get the target section ID from the clicked tab
    const targetSection = document.querySelector(targetSectionId); // Get the target section element
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop, // Scroll to the top position of the target section
            behavior: 'smooth' // Smooth scroll behavior
        });
    }
}
