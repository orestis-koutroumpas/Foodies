// public/javascript/user-profile.js

// Function to handle general information update
function updateGeneralInfo() {
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    const user = {
        email: email,
        fName: firstName,
        lName: lastName,
        address: address,
        phoneNumber: phoneNumber,
    };

    fetch('/user-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            alert('User profile updated successfully!');
            return response.text();
        }
        throw new Error('Failed to update user profile');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to handle password change
function changePassword() {
    const email = document.getElementById("email").value;
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password-1").value;
    const repeatPassword = document.getElementById("new-password-2").value;

    if (newPassword !== repeatPassword) {
        alert('New passwords do not match!');
        return;
    }

    const passwords = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    };

    fetch('/user-profile/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwords)
    })
    .then(response => {
        if (response.ok) {
            alert('Password updated successfully!');
            return response.text();
        }
        throw new Error('Failed to update password');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementById("saveChangesButton").addEventListener("click", function() {
    const activeTab = document.querySelector(".list-group-item-action.active").getAttribute("href");
    if (activeTab === "#account-general") {
        updateGeneralInfo();
    } else if (activeTab === "#account-change-password") {
        changePassword();
    }
});

document.querySelector(".button-default").addEventListener("click", function() {
    location.reload(); // This will refresh the page
});
