// controller/login-controller.mjs

// import bcrypt from 'bcrypt';
import { getUserByEmail, registerUser } from '../model/model.mjs';

export let doRegister = async function (req, res) {
    try {
        const { email, password, fname, lname, address, phone_number } = req.body;
        const registrationResult = await registerUser(email, password, fname, lname, address, phone_number);
        if (registrationResult.message) {
            return res.json({ success: true, message: registrationResult.message });
        } else {
            return res.json({ success: false});
        }
    } catch (error) {
        console.error('Registration error: ' + error);
        return res.json({ success: false, message: error.message });
    }
}

export let doLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
            return res.json({ success: false, message: 'User not found' });
        } else {
            // const match = await bcrypt.compare(password, user.password);
            if (password === user.password) {
                req.session.isAuthenticated = true;
                req.session.user = {
                    email: user.email,
                    fname: user.fname,
                    lname: user.lname,
                    address: user.address,
                    phone_number: user.phone_number
                };
                return res.json({ success: true });
            } else {
                return res.json({ success: false, message: 'Incorrect password' });
            }
        }
    } catch (error) {
        console.error('login error: ' + error);
        return res.json({ success: false, message: 'Error during login' });
    }
}

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

export let checkAuthenticated = function (req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        if (req.originalUrl === "/login" || req.originalUrl === "/signup") {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

export function setAuthState(req, res, next) {
    res.locals.isAuthenticated = req.session.isAuthenticated || false;
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
}

export async function renderLoginPage(req, res) {
    try {
        res.render('login', {
            layout: false,
            renderCss: [
                '/css/login-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
};