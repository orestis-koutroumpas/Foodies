// controller/update-address-controller.mjs

import { updateUserAddress } from '../model/model.mjs';

export let updateAddress = async function (req, res) {
    try {
        if (req.session.isAuthenticated) {
            const { address } = req.body;
            const userEmail = req.session.user.email;
            await updateUserAddress(userEmail, address);
            req.session.user.address = address; // Update session address
            return res.status(200).json({ success: true });
        } else {
            return res.status(403).json({ success: false, message: 'User not authenticated' });
        }
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
