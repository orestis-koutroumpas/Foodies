// public/javascript/user-profile.js

document.getElementById("saveChangesButton").addEventListener("click", function() {
    // Get the values from the input fields
    const email = document.getElementById("email").value;

    const oldPassword = document.getElementById("old-password").value; // To fix !!!
    const newPassword1 = document.getElementById("new-password-1").value; // To fix !!!
    const newPassword2 = document.getElementById("new-password-2").value; // To fix !!!

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (newPassword1 !== newPassword2) {
        alert("New passwords do not match. Please try again.");
        return; // Exit the function if passwords do not match
    }
    const newPassword = newPassword1 || oldPassword;
    
    const user = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
        fName: firstName,
        lName: lastName,
        address: address,
        phoneNumber: phoneNumber,
    };
    // Send a POST request to the server to update the user profile
    fetch('/user-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Failed to update user profile');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Add event listener to the "Cancel" button
document.querySelector(".button-default").addEventListener("click", function() {
    location.reload(); // This will refresh the page
});