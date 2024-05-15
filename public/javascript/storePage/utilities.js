export function toggleSidebar() {
    var sidebarIcon = document.querySelector('#sidebar-icon');
    var sidebar = document.querySelector('#sidebar');
    var categories = document.querySelectorAll('#sidebar a'); 

    sidebarIcon.addEventListener('click', function() {
        if (sidebar.style.display === 'block') {
            sidebar.style.display = 'none';
            sidebarIcon.classList.remove('open');
            document.body.style.overflow = 'auto'; 
        } else {
            sidebar.style.display = 'block';
            sidebarIcon.classList.add('open');
            document.body.style.overflow = 'hidden'; 
        }
    });

    categories.forEach(function(category) {
        category.addEventListener('click', function() {
            sidebar.style.display = 'none';
            sidebarIcon.classList.remove('open');
            document.body.style.overflow = 'auto'; 
        });
    });
}

export function handleResize() {
    var navbarItems = document.querySelectorAll('.menu-category-nav .tab');
    var sidebar = document.getElementById('sidebar');

    if (sidebar) {
        if (window.innerWidth <= 1200) {
            navbarItems.forEach(function(item) {
                sidebar.appendChild(item);
            });
        } else {
            var navbar = document.querySelector('.menu-category-nav .tabs-box');
            if (navbar) {
                while (sidebar.firstChild) {
                    navbar.appendChild(sidebar.firstChild);
                }
            }
        }
    }
}
