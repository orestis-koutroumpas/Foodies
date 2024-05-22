// public/javascript/user-menu.js

// Event listener to close the user menu
document.addEventListener("click", function(event) {
    let subMenu = document.getElementById("subMenu");
    let userPic = document.querySelector(".user-pic");

    // Check if the clicked target is not the userPic or a descendant of subMenu
    if (!subMenu.contains(event.target) && event.target !== userPic) {
        subMenu.classList.remove("open-menu");
    }
});

// Function to open and close the menu when clicking the user img
function toggleMenu() {
    let subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}