import { fetchTabsData, getTabsData, getIsDragging, setIsDragging } from './data.js';


export async function initializeTabsManagement(storeName, tabsBoxSelector) {
    // Fetch store details to get the category
    try {
        const storeDetailsResponse = await fetch(`/api/store-info/${storeName}`);
        if (!storeDetailsResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const storeDetails = await storeDetailsResponse.json();
        const storeId = storeDetails.id; // Extract the store ID from the store details

        // Fetch tabs data based on store category
        await fetchTabsData(storeId);

        const tabsData = getTabsData();

        generateTabs(tabsBoxSelector, tabsData);

    } catch (error) {
        console.error('Error fetching store details or tabs data:', error);
    }
}


export function generateTabs(tabsBoxSelector, tabsData) {
    const tabsBox = document.querySelector(tabsBoxSelector);

    while (tabsBox.firstChild) {
        tabsBox.firstChild.remove();
    }

    tabsData.forEach((tab, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'tab';
        if (index === 0) {
            listItem.className += ' active';
        }

        const link = document.createElement('a');
        link.href = `#category-${index + 1}`;
        link.textContent = tab;

        listItem.appendChild(link);
        tabsBox.appendChild(listItem);
    });
}

export function handleIcons(scrollVal) {
    const tabsBox = document.querySelector(".tabs-box");
    const arrowIcons = document.querySelectorAll(".icon i");
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

export function handleIconClick(icon) {
    const tabsBox = document.querySelector(".tabs-box");
    let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
    handleIcons(scrollWidth);
}

export function handleTabClick(tab) {
    const tabsBox = document.querySelector(".tabs-box");
    tabsBox.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
}

export function dragging(e) {
    const tabsBox = document.querySelector(".tabs-box");
    if(!getIsDragging()) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft);
}

export function dragStop() {
    const tabsBox = document.querySelector(".tabs-box");
    setIsDragging(false);
    tabsBox.classList.remove("dragging");
}

export function handleScroll() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);

    const element = document.querySelector('.menu-nav');
    const menuNavBottom = element.getBoundingClientRect().bottom;
    element.classList.toggle('sticky', window.scrollY > menuNavBottom);
}

export function autoScrollToActiveTab() {
    const activeTab = document.querySelector('.tab.active');
    const tabsBox = document.querySelector(".tabs-box");
    if (!activeTab) return;

    const activeTabLeft = activeTab.getBoundingClientRect().left;
    const tabsBoxLeft = tabsBox.getBoundingClientRect().left;

    tabsBox.scrollLeft += activeTabLeft - tabsBoxLeft;
}

export function updateActiveTab() {
    const sections = document.querySelectorAll('.menu-items');
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
            currentSectionId = section.id;
        }
    });

    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        activeTab.classList.remove('active');
    }

    const correspondingTab = document.querySelector(`.tab a[href="#${currentSectionId}"]`);
    if (correspondingTab) {
        correspondingTab.parentElement.classList.add('active');
    }

    autoScrollToActiveTab();
}

export function scrollToSection(event) {
    event.preventDefault();
    const targetSectionId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetSectionId);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    }
}
