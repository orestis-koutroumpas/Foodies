// public/javascript/category-search.js

// In home page adds event listeners to each food category and partner store
// for redirecting into search oage and store page
document.addEventListener('DOMContentLoaded', function() {
    // Get all food categories
    const foodCategoryItems = document.querySelectorAll('.food-category .service-item');
    // Iterate over each food category item
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
    // Iterate over each partner store item
    partnerStoreItems.forEach(function(item) {
        // Add click event listener to each store item
        item.addEventListener('click', function() {
            // Get the store name
            const storeName = this.querySelector('p').textContent;
            // Replace whitespace with '-' for the URL
            const formattedStoreName = storeName.replace(/\s+/g, '-');
            // Redirect to the store page with the formatted store name
            const url = '/store/' + encodeURIComponent(formattedStoreName);
            window.location.href = url;
        });
    });
});
