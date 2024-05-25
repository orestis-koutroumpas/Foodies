document.addEventListener('DOMContentLoaded', function () {
    fetchSessionInfo();
});

async function fetchSessionInfo() {
    try {
        const response = await fetch('/session-info');
        const sessionInfo = await response.json();
        updateHeader(sessionInfo);
    } catch (error) {
        console.error('Error fetching session info:', error);
    }
}

function updateHeader(sessionInfo) {
    const userIcon = document.getElementById('user-profile');
    const loginSignupIcon = document.getElementById('login-signup');
    const locationText = document.getElementById('location-text');

    if (sessionInfo.isAuthenticated) {
        if (loginSignupIcon) {
            loginSignupIcon.style.display = 'none';
        }
        if (userIcon) {
            userIcon.style.display = 'block';
            const userNameElement = userIcon.querySelector('h3');
            if (userNameElement) {
                userNameElement.textContent = `${sessionInfo.user.fname} ${sessionInfo.user.lname}`;
            }
        }
        if (locationText) {
            locationText.innerHTML = `${sessionInfo.user.address} <i class="fa-solid fa-chevron-down"></i>`;
        }
    } else {
        if (loginSignupIcon) {
            loginSignupIcon.style.display = 'block';
        }
        if (userIcon) {
            userIcon.style.display = 'none';
        }
        if (locationText) {
            locationText.innerHTML = `Location <i class="fa-solid fa-chevron-down"></i>`;
        }
    }
}
