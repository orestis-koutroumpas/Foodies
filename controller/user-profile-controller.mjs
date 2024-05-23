/* // controller/user-profile.controller.mjs

import bcrypt from 'bcrypt';
import { getUserByEmail, updateUser, updateUserPassword } from '../model/model.mjs';

export async function userProfileController(req, res, options = {}) {
    try {
        const email = req.session.user.email;
        const user = await getUserByEmail(email);

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
                ],
                isHidden: options.isHidden || false
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

export async function changeUserPassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    try {
        const email = req.session.user.email;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(400).send('Incorrect current password');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updateUserPassword(email, hashedPassword);

        res.status(200).send('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Internal Server Error');
    }
}
 */