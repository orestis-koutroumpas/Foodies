// public/javascript/store-click.js

document.addEventListener('DOMContentLoaded', function() {
    console.log("asd")
    // Get all store elements
    const storeItems = document.querySelectorAll('.store');
    console.log(storeItems)
    // Add click event listener to each store item
    storeItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Get the name of the clicked store
            const storeName = this.querySelector('.store-title p').textContent;
            // Redirect to the store page
            var formattedStoreName = storeName.replace(/\s+/g, '-'); // Remove spaces from storeName
            var url = '/store/' + encodeURIComponent(formattedStoreName); // Encode the store name
            window.location.href = url; // Redirect to the URL
        });
    });
});
