import { handleScroll, updateActiveTab, autoScrollToActiveTab } from './tabsManagement.js';
import { handleIconClick, handleTabClick, scrollToSection, dragging, dragStop } from './tabsManagement.js';
import { arrowIcons, tabsBox, allTabs, isDragging } from './data.js';


export function initialize() {
    toggleSearch('search-bar', 'search-button');
    autoScrollToActiveTab();
    updateActiveTab();
    addEventListeners();
}

function addEventListeners() {
    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => handleIconClick(icon));
    });

    allTabs.forEach(tab => {
        tab.addEventListener("click", () => handleTabClick(tab));
        tab.addEventListener('click', scrollToSection);
    });

    tabsBox.addEventListener("mousedown", () => isDragging = true);
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', updateActiveTab);
}

function toggleSearch(search, button) {
    const searchBar = document.getElementById(search);
    const searchButton = document.getElementById(button);

    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('show-search');
    });
}
