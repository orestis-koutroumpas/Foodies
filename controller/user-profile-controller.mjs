// controller/user-profile.controller.mjs

import { getUser, updateUser } from '../model/model.mjs';

export async function userProfileController(req, res) {
    try {
        // Fake user data
        const email = 'user@example.com';

        const user = await getUser(email);

        if (user) {
            res.render('user-profile', {
                pageTitle: "User Profile",
                userEmail: user.email,
                userFname: user.fname,
                userLname: user.lname,
                userAddress: user.address,
                userPhoneNumber: user.phone_number,
                renderCss: [
                    '/css/user-profile-styles.css'
                ]
            });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user profile data:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function updateUserInfo(req, res) {
    const { email, fName, lName, address, phoneNumber } = req.body;
    try {
        await updateUser(email, fName, lName, address, phoneNumber); 
        res.status(200).send('User profile updated successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user profile');
    }
}