// Function to toggle the sidebar
export function toggleSidebar() {
    var sidebarIcon = document.querySelector('#sidebar-icon'); // Get the sidebar icon element
    var sidebar = document.querySelector('#sidebar'); // Get the sidebar element
    var categories = document.querySelectorAll('#sidebar a'); // Get all category links in the sidebar

    // Event listener for click event on sidebar icon
    sidebarIcon.addEventListener('click', function() {
        if (sidebar.style.display === 'block') {
            sidebar.style.display = 'none'; // Hide sidebar
            sidebarIcon.classList.remove('open'); // Remove open class from sidebar icon
            document.body.style.overflow = 'auto'; // Enable body scroll
        } else {
            sidebar.style.display = 'block'; // Show sidebar
            sidebarIcon.classList.add('open'); // Add open class to sidebar icon
            document.body.style.overflow = 'hidden'; // Disable body scroll
        }
    });

    // Event listener for click event on each category link
    categories.forEach(function(category) {
        category.addEventListener('click', function() {
            sidebar.style.display = 'none'; // Hide sidebar
            sidebarIcon.classList.remove('open'); // Remove open class from sidebar icon
            document.body.style.overflow = 'auto'; // Enable body scroll
        });
    });
}

// Function to handle window resize event
export function handleResize() {
    var navbarItems = document.querySelectorAll('.menu-category-nav .tab'); // Get all tab items in the menu category navigation
    var sidebar = document.getElementById('sidebar'); // Get the sidebar element

    if (sidebar) {
        // Check if window width is less than or equal to 1200px
        if (window.innerWidth <= 1200) {
            navbarItems.forEach(function(item) {
                sidebar.appendChild(item); // Move tab items to the sidebar
            });
        } else {
            var navbar = document.querySelector('.menu-category-nav .tabs-box'); // Get the tabs box element in the menu category navigation
            if (navbar) {
                while (sidebar.firstChild) {
                    navbar.appendChild(sidebar.firstChild); // Move sidebar items back to the navbar
                }
            }
        }
    }
}
