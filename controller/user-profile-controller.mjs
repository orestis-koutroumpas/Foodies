// controller/user-profile.controller.mjs

import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { getUserByEmail, updateUser, updateUserPassword, updateUserAddress } from '../model/model.mjs'; // Import necessary functions from the model

// Controller to render user profile
export async function userProfileController(req, res, options = {}) {
    try {
        const email = req.session.user.email; // Retrieve email from session
        const user = await getUserByEmail(email); // Fetch user data by email

        if (user) {
            // Render user profile page with user data
            res.render('user-profile', {
                pageTitle: "User Profile",
                userEmail: user.email,
                userFname: user.fname,
                userLname: user.lname,
                userAddress: user.address,
                userPhoneNumber: user.phone_number,
                renderCss: [
                    '/css/user-profile-styles.css' // CSS for user profile page
                ],
                isHidden: options.isHidden || false // Option to hide certain elements
            });
        } else {
            res.status(404).send('User not found'); // Send 404 error if user not found
        }
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error fetching user profile data:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Controller to update user information
export async function updateUserInfo(req, res) {
    const { email, fName, lName, address, phoneNumber } = req.body; // Extract data from request body
    try {
        await updateUser(email, fName, lName, address, phoneNumber); // Update user data in the database
        res.status(200).send('User profile updated successfully!'); // Send success response
    } catch (error) {
        // Log the error and send a 500 error response
        console.error(error);
        res.status(500).send('Error updating user profile');
    }
}

// Controller to change user password
export async function changeUserPassword(req, res) {
    const { oldPassword, newPassword } = req.body; // Extract passwords from request body
    try {
        const email = req.session.user.email; // Retrieve email from session
        const user = await getUserByEmail(email); // Fetch user data by email
        if (!user) {
            return res.status(404).send('User not found'); // Send 404 error if user not found
        }

        const match = await bcrypt.compare(oldPassword, user.password); // Compare old password with stored password
        if (!match) {
            return res.status(400).send('Incorrect current password'); // Send 400 error if passwords do not match
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        await updateUserPassword(email, hashedPassword); // Update password in the database

        res.status(200).send('Password updated successfully!'); // Send success response
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error updating password:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Controller to update user address
export let updateAddress = async function (req, res) {
    try {
        if (req.session.isAuthenticated) {
            const { address } = req.body; // Extract address from request body
            const userEmail = req.session.user.email; // Retrieve email from session
            await updateUserAddress(userEmail, address); // Update address in the database
            req.session.user.address = address; // Update session address
            return res.status(200).json({ success: true }); // Send success response
        } else {
            return res.status(403).json({ success: false, message: 'User not authenticated' }); // Send 403 error if user not authenticated
        }
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error updating address:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
