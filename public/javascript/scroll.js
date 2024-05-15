window.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const headerDivider = document.querySelector('.header-divider');

    header.style.backgroundColor = 'transparent';
    headerDivider.style.backgroundColor = 'transparent';

    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            // When scrolled, set background color to white
            header.style.backgroundColor = 'white';
            headerDivider.style.backgroundColor = "lightgrey";
        }
        else {
            header.style.backgroundColor = 'transparent';
            headerDivider.style.backgroundColor = 'transparent';
        }
    });
});