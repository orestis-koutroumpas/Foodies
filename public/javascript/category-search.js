// public/javascript/category-search.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all food category elements
    const foodCategoryItems = document.querySelectorAll('.food-category .service-item');
    foodCategoryItems.forEach(function(item) {
        // Add click event listener to each food category item
        item.addEventListener('click', function() {
            // Get the text content of the clicked food category
            const categoryName = this.querySelector('p').textContent;
            // Redirect to the search page with the food category name as query parameter
            window.location.href = '/search?q=' + encodeURIComponent(categoryName);
        });
    });

    // Get all partner store elements
    const partnerStoreItems = document.querySelectorAll('.partner-stores .service-item');
    partnerStoreItems.forEach(function(item) {
        // Add click event listener to each partner store item
        item.addEventListener('click', function() {
            // Get the text content of the clicked partner store
            const storeName = this.querySelector('p').textContent;
            // Redirect to the store page
            var formattedStoreName = storeName.replace(/\s+/g, '-'); // Remove spaces from storeName
            var url = '/store/' + encodeURIComponent(formattedStoreName); // Encode the store name
            window.location.href = url; // Redirect to the URL
            });
    });
});
