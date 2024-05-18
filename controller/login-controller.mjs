// controller/auth-controller.mjs
import bcrypt from 'bcrypt';

export const loginController = async (req, res) => {
    try {
        res.render('login', {
            pageTitle: "Log in"
        });
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
};