// public/javascript/user-profile.js

import { printUserProfile } from '../controller/user-profile-controller.mjs';

document.getElementById("saveChangesButton").addEventListener("click", function() {
    // Get the values from the input fields
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
    }

    printUserProfile(user)
});