// public/javascript/likedStore.js

export function handleLikedStore() {
    const likedStoreElement = document.querySelector('.Liked-Store');
    window.isLiked = false; // Initialize the global flag

    likedStoreElement.addEventListener('click', () => {
        likedStoreElement.classList.toggle('liked');
        window.isLiked = !window.isLiked; // Toggle the global flag
    });
}