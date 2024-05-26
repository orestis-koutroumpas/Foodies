import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { getUserByEmail, registerUser } from '../model/model.mjs'; // Import functions to get and register users

// Function to save session and send a response
const saveSession = (req, res, user, message) => {
    req.session.isAuthenticated = true; // Set session as authenticated
    req.session.user = { // Store user details in session
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        address: user.address,
        phone_number: user.phone_number
    };

    // Save the session
    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.json({ success: false, message: 'Error during registration' }); // Send error response if session save fails
        }
        return res.json({ success: true, message }); // Send success response if session save succeeds
    });
};

// Function to handle user registration
export let doRegister = async function (req, res) {
    try {
        const { email, password, fname, lname, address, phone_number } = req.body; // Extract user data from request body
        const existingUser = await getUserByEmail(email); // Check if a user with the same email already exists
        if (existingUser) {
            return res.json({ success: false, message: 'A user with this email already exists' }); // Send response if user exists
        }

        const registrationResult = await registerUser(email, password, fname, lname, address, phone_number); // Register the new user
        if (registrationResult.message) {
            const user = { email, fname, lname, address, phone_number };
            saveSession(req, res, user, registrationResult.message); // Save session if registration is successful
        } else {
            return res.json({ success: false }); // Send failure response if registration fails
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.json({ success: false, message: error.message }); // Send error response if an exception occurs
    }
};

// Function to handle user login
export let doLogin = async function (req, res) {
    try {
        const { email, password } = req.body; // Extract login data from request body
        const user = await getUserByEmail(email); // Fetch user by email

        if (!user || !user.password) {
            return res.json({ success: false, message: 'User not found' }); // Send response if user is not found
        }

        const match = await bcrypt.compare(password, user.password); // Compare provided password with stored password

        if (match) {
            req.session.isAuthenticated = true; // Set session as authenticated
            req.session.user = { // Store user details in session
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                address: user.address,
                phone_number: user.phone_number
            };

            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.json({ success: false, message: 'Error during login' }); // Send error response if session save fails
                }
                return res.json({ success: true }); // Send success response if session save succeeds
            });
        } else {
            return res.json({ success: false, message: 'Incorrect password' }); // Send response if password does not match
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.json({ success: false, message: 'Error during login' }); // Send error response if an exception occurs
    }
};

// Function to handle user logout
export let doLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Error during logout'); // Send error response if session destruction fails
        }
        res.redirect('/'); // Redirect to home page on successful logout
    });
};

// Middleware to check if user is authenticated
export function checkAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next(); // Proceed if authenticated
    } else {
        res.status(401).send('Unauthorized'); // Send unauthorized response if not authenticated
    }
}

// Middleware to set authentication state in response locals
export function setAuthState(req, res, next) {
    if (req.session && req.session.isAuthenticated && req.session.user) {
        res.locals.isAuthenticated = true; // Set authenticated state
        res.locals.user = req.session.user; // Set user details
    } else {
        res.locals.isAuthenticated = false; // Set unauthenticated state
        res.locals.user = null; // Clear user details
    }
    next(); // Proceed to the next middleware
}

// Function to render the login page
export async function renderLoginPage(req, res) {
    try {
        res.render('partials/login', {
            layout: false, // Ensure no layout is used for partial rendering
            renderCss: [
                '/css/login-styles.css' // CSS for login page
            ]
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error'); // Send error response if an exception occurs
    }
}
