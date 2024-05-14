// public/javascript/store-click.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all stores
    const storesItems = document.querySelectorAll('.store');
    storesItems.forEach(function(item) {
        // Add click event listeners to each store
        item.addEventListener('click', function() {
            // Get the store name
            const storeName = this.querySelector('p').textContent;
            // Replace space with -
            const formattedStoreName = storeName.replace(/\s+/g, '-');
            // Redirect to the store page
            window.location.href = '/store/' + encodeURIComponent(formattedStoreName);
            window.location.href = url;
        })
    })
}); 
