// controller/user-profile.controller.mjs

import bcrypt from 'bcryptjs';
import { getUserByEmail, updateUser, updateUserPassword, updateUserAddress } from '../model/model.mjs';

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
                    '/css/user-profile-styles.css'
                ],
                isHidden: options.isHidden || false
            });
        } else {
            res.status(404).send('User not found'); // User not found
        }
    } catch (error) {
        console.error('Error fetching user profile data:', error);
        res.status(500).send('Internal Server Error'); // Handle server error
    }
}

// Controller to update user information
export async function updateUserInfo(req, res) {
    const { email, fName, lName, address, phoneNumber } = req.body; // Extract data from request body
    try {
        await updateUser(email, fName, lName, address, phoneNumber); // Update user data in the database
        res.status(200).send('User profile updated successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user profile'); // Handle server error
    }
}

// Controller to change user password
export async function changeUserPassword(req, res) {
    const { oldPassword, newPassword } = req.body; // Extract passwords from request body
    try {
        const email = req.session.user.email; // Retrieve email from session
        const user = await getUserByEmail(email); // Fetch user data by email
        if (!user) {
            return res.status(404).send('User not found'); // User not found
        }

        const match = await bcrypt.compare(oldPassword, user.password); // Compare old password
        if (!match) {
            return res.status(400).send('Incorrect current password'); // Incorrect current password
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash new password
        await updateUserPassword(email, hashedPassword); // Update password in the database

        res.status(200).send('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Internal Server Error'); // Handle server error
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
            return res.status(200).json({ success: true });
        } else {
            return res.status(403).json({ success: false, message: 'User not authenticated' }); // User not authenticated
        }
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' }); // Handle server error
    }
};
