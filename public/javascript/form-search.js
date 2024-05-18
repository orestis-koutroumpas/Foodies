// public/javascript/search.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the search form element
    var searchForm = document.getElementById('search');

    // Add submit event listener to the search form
    searchForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the value entered in the search input field
        let searchQuery = document.getElementById('search').value;

        // Redirect to the search page with the entered query as a query parameter
        window.location.href = '/search?=' + encodeURIComponent(searchQuery);
    });
});
