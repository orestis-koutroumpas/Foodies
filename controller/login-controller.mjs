// controller/auth-controller.mjs
import bcrypt from 'bcrypt';

export async function loginController(req, res) {    try {
        res.render('login', {
            pageTitle: "Log in",
            layout: false,
            renderCss: [
                '/css/login-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
};