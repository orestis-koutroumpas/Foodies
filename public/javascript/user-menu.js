// public/javascript/user-menu.js

// Event listener to close the user menu
document.addEventListener('DOMContentLoaded', function () {
    let subMenu = document.getElementById("subMenu");
    let userIcon = document.getElementById("user-profile");
    let arrow = document.getElementById("arrow");

    function toggleMenu() {
        subMenu.classList.toggle("open-menu");
        arrow.classList.toggle("flipped");
    }

    userIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', function (event) {
        if (!userIcon.contains(event.target) && subMenu.classList.contains("open-menu")) {
            toggleMenu();
        }
    });
});