// public/javascript/category-search.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all food categories
    const foodCategoryItems = document.querySelectorAll('.food-category .service-item');
    foodCategoryItems.forEach(function(item) {
        // Add click event listener to each category item
        item.addEventListener('click', function() {
            // Get the text content of the clicked food category
            const categoryName = this.querySelector('p').textContent;
            // Redirect to the search page with the food category name as query parameter
            window.location.href = '/search?q=' + encodeURIComponent(categoryName);
        });
    });

    // Get all partner stores
    const partnerStoreItems = document.querySelectorAll('.partner-stores .service-item');
    partnerStoreItems.forEach(function(item) {
        // Add click event listener to each store item
        item.addEventListener('click', function() {
            // Get the store name
            const storeName = this.querySelector('p').textContent;
            // Redirect to the store page
            const formattedStoreName = storeName.replace(/\s+/g, '-'); 
            const url = '/store/' + encodeURIComponent(formattedStoreName);
            window.location.href = url;
        });
    });
});
