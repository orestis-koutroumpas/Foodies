// public/javascript/user-profile.js

// Function to handle general information update
function updateGeneralInfo() {
    // Get user input values from the form
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    // Create a user object with the input values
    const user = {
        email: email,
        fName: firstName,
        lName: lastName,
        address: address,
        phoneNumber: phoneNumber,
    };

    // Send a POST request to update the user profile
    fetch('/user-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // Convert user object to JSON string
    })
    .then(response => {
        if (response.ok) {
            alert('User profile updated successfully!'); // Show success message
            return response.text();
        }
        throw new Error('Failed to update user profile'); // Throw error if response is not ok
    })
    .catch(error => {
        console.error('Error:', error); // Log error to console
    });
}

// Function to handle password change
function changePassword() {
    // Get user input values from the form
    const email = document.getElementById("email").value;
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password-1").value;
    const repeatPassword = document.getElementById("new-password-2").value;

    // Check if new passwords match
    if (newPassword !== repeatPassword) {
        alert('New passwords do not match!'); // Show alert if passwords do not match
        return;
    }

    // Create a passwords object with the input values
    const passwords = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword
    };

    // Send a POST request to change the password
    fetch('/user-profile/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwords) // Convert passwords object to JSON string
    })
    .then(response => {
        if (response.ok) {
            alert('Password updated successfully!'); // Show success message
            return response.text();
        }
        throw new Error('Failed to update password'); // Throw error if response is not ok
    })
    .catch(error => {
        console.error('Error:', error); // Log error to console
    });
}

// Event listener for the save changes button
document.getElementById("saveChangesButton").addEventListener("click", function() {
    // Get the active tab to determine which form to submit
    const activeTab = document.querySelector(".list-group-item-action.active").getAttribute("href");
    if (activeTab === "#account-general") {
        updateGeneralInfo(); // Call function to update general information
    } else if (activeTab === "#account-change-password") {
        changePassword(); // Call function to change password
    }
});

// Event listener for the default button to refresh the page
document.querySelector(".button-default").addEventListener("click", function() {
    location.reload(); // Refresh the page
});
