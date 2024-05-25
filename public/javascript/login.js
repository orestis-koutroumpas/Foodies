// login.js

export function openModal() {
    const modal = document.getElementById("loginModal");
    const loginContainer = document.getElementById("login-container");
    modal.style.display = "flex";
    modal.classList.add("blur");
    loginContainer.style.display = "block";
    document.body.classList.add("modal-open");
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('login-container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    const signUpButton = document.getElementById('sign-up-button');
    const signInButton = document.getElementById('sign-in-button');
    const signUpMessage = document.createElement('div');
    signUpMessage.id = 'sign-up-message';
    signUpButton.insertAdjacentElement('afterend', signUpMessage);
    const signInMessage = document.createElement('div');
    signInMessage.id = 'sign-in-message';
    signInButton.insertAdjacentElement('afterend', signInMessage);

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    function closeModal() {
        const modal = document.getElementById("loginModal");
        const loginContainer = document.getElementById("login-container");
        modal.style.display = "none";
        modal.classList.remove("blur");
        loginContainer.style.display = "none";
        document.body.classList.remove("modal-open");
    }

    window.onclick = function (event) {
        if (event.target === document.getElementById("loginModal")) {
            closeModal();
        }
    }

    const loginSignupButton = document.querySelector('.login-signup-button');
    if (loginSignupButton) {
        loginSignupButton.addEventListener('click', () => {
            // Store the current URL in localStorage before opening the modal
            localStorage.setItem('intendedUrl', window.location.href);
            openModal();
        });
    }

    const loginForm = document.getElementById('sign-in');
    const registerForm = document.getElementById('sign-up');

    function showError(input, message) {
        const inputGroup = input.parentElement;
        const errorMessage = inputGroup.querySelector('.error-message');
        const invalidIcon = inputGroup.querySelector('.invalid-icon');
        const validIcon = inputGroup.querySelector('.valid-icon');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorMessage.innerText = message;
        invalidIcon.style.display = 'block';
        validIcon.style.display = 'none';
    }

    function clearError(input) {
        const inputGroup = input.parentElement;
        const errorMessage = inputGroup.querySelector('.error-message');
        const invalidIcon = inputGroup.querySelector('.invalid-icon');
        const validIcon = inputGroup.querySelector('.valid-icon');
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorMessage.innerText = '';
        invalidIcon.style.display = 'none';
        validIcon.style.display = 'block';
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateName(name) {
        const nameRegex = /^[A-Za-zΆ-Ϋά-ώ]+$/;
        return nameRegex.test(name);
    }

    function validateAddress(address) {
        // Address validation: Road name, number (single or range), region, optional postal code with commas or spaces
        const addressRegex = /^[A-Za-zΆ-Ϋά-ώ\s]+[,\s]+(\d+|\d+-\d+)[,\s]+[A-Za-zΆ-Ϋά-ώ\s]+[,\s]*\d{0,5}$/;
        return addressRegex.test(address);
    }

    function validatePhoneNumber(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    function validateForm(form) {
        let isValid = true;

        const email = form.querySelector('input[name="email"]');
        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address.");
            isValid = false;
        } else {
            clearError(email);
        }

        const fname = form.querySelector('input[name="fname"]');
        if (fname && !validateName(fname.value)) {
            showError(fname, "First name should contain only letters (Greek or English).");
            isValid = false;
        } else if (fname) {
            clearError(fname);
        }

        const lname = form.querySelector('input[name="lname"]');
        if (lname && !validateName(lname.value)) {
            showError(lname, "Last name should contain only letters (Greek or English).");
            isValid = false;
        } else if (lname) {
            clearError(lname);
        }

        const address = form.querySelector('input[name="address"]');
        if (address && !validateAddress(address.value)) {
            showError(address, "Enter a valid address (Road name, number, region, optional postal code).");
            isValid = false;
        } else if (address) {
            clearError(address);
        }

        const phone = form.querySelector('input[name="phone_number"]');
        if (phone && !validatePhoneNumber(phone.value)) {
            showError(phone, "Phone number should contain exactly 10 digits.");
            isValid = false;
        } else if (phone) {
            clearError(phone);
        }

        return isValid;
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        // Validate form here
        if (!validateForm(loginForm)) {
            return;
        }

        try {
            signInButton.innerText = "Signing In...";
            signInMessage.innerText = "";
            const response = await fetch('/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                signInMessage.innerText = "Sign In Successful!";
                signInMessage.style.color = "green";
                setTimeout(() => {
                    signInMessage.innerText = "";
                    closeModal();
                    // Redirect to the intended URL after login
                    const intendedUrl = localStorage.getItem('intendedUrl') || '/home';
                    window.location.href = intendedUrl;
                }, 800);
            } else {
                signInButton.innerText = "Sign In";
                signInMessage.innerText = result.message;
                signInMessage.style.color = "red";
                const emailField = loginForm.querySelector('input[name="email"]');
                showError(emailField, result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            signInButton.innerText = "Sign In";
            signInMessage.innerText = "Error during login";
            signInMessage.style.color = "red";
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        // Validate form here
        if (!validateForm(registerForm)) {
            return;
        }

        try {
            signUpButton.innerText = "Registering...";
            signUpMessage.innerText = "";
            const response = await fetch('/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (result.success) {
                signUpButton.innerText = "Sign Up Successful!";
                signUpMessage.innerText = "Sign Up Successful!";
                signUpMessage.style.color = "green";
                setTimeout(() => {
                    signUpButton.innerText = "Sign Up";
                    signUpMessage.innerText = "";
                    registerForm.reset();  // Clear the form inputs
                    clearFormValidation(registerForm);
                    loginBtn.click();  // Automatically switch to login form
                }, 2000);
            } else {
                signUpButton.innerText = "Sign Up";
                signUpMessage.innerText = result.message;
                signUpMessage.style.color = "red";
                const emailField = registerForm.querySelector('input[name="email"]');
                showError(emailField, result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            signUpButton.innerText = "Sign Up";
            signUpMessage.innerText = "Error during registration";
            signUpMessage.style.color = "red";
        }
    });

    // Show/Hide Password Functionality
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Dynamic Validation for All Inputs
    document.querySelectorAll('input[type="email"]').forEach(emailInput => {
        emailInput.addEventListener('input', function () {
            if (validateEmail(this.value)) {
                clearError(this);
            } else {
                showError(this, "Enter a valid email address.");
            }
        });
    });

    document.querySelectorAll('input[name="fname"]').forEach(fnameInput => {
        fnameInput.addEventListener('input', function () {
            if (validateName(this.value)) {
                clearError(this);
            } else {
                showError(this, "First name should contain only letters (Greek or English).");
            }
        });
    });

    document.querySelectorAll('input[name="lname"]').forEach(lnameInput => {
        lnameInput.addEventListener('input', function () {
            if (validateName(this.value)) {
                clearError(this);
            } else {
                showError(this, "Last name should contain only letters (Greek or English).");
            }
        });
    });

    document.querySelectorAll('input[name="address"]').forEach(addressInput => {
        addressInput.addEventListener('input', function () {
            if (validateAddress(this.value)) {
                clearError(this);
            } else {
                showError(this, "Enter a valid address (Road name, number, region, optional postal code).");
            }
        });
    });

    document.querySelectorAll('input[name="phone_number"]').forEach(phoneInput => {
        phoneInput.addEventListener('input', function () {
            if (validatePhoneNumber(this.value)) {
                clearError(this);
            } else {
                showError(this, "Phone number should contain exactly 10 digits.");
            }
        });
    });

    function clearFormValidation(form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
            const errorMessage = input.parentElement.querySelector('.error-message');
            if (errorMessage) errorMessage.innerText = '';
            const validIcon = input.parentElement.querySelector('.valid-icon');
            const invalidIcon = input.parentElement.querySelector('.invalid-icon');
            if (validIcon) validIcon.style.display = 'none';
            if (invalidIcon) invalidIcon.style.display = 'none';
        });
    }
});