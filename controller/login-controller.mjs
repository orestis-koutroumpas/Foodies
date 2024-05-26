import bcrypt from 'bcryptjs';
import { getUserByEmail, registerUser } from '../model/model.mjs';

const saveSession = (req, res, user, message) => {
    req.session.isAuthenticated = true;
    req.session.user = {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        address: user.address,
        phone_number: user.phone_number
    };

    req.session.save((err) => {
        if (err) {
            console.error('Session save error:', err);
            return res.json({ success: false, message: 'Error during registration' });
        }
        console.log('Session saved:', req.session);
        return res.json({ success: true, message });
    });
};

export let doRegister = async function (req, res) {
    try {
        const { email, password, fname, lname, address, phone_number } = req.body;
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.json({ success: false, message: 'A user with this email already exists' });
        }

        const registrationResult = await registerUser(email, password, fname, lname, address, phone_number);
        if (registrationResult.message) {
            const user = { email, fname, lname, address, phone_number };
            saveSession(req, res, user, registrationResult.message);
        } else {
            return res.json({ success: false });
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.json({ success: false, message: error.message });
    }
};

export let doLogin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
            return res.json({ success: false, message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            req.session.isAuthenticated = true;
            req.session.user = {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                address: user.address,
                phone_number: user.phone_number
            };

            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.json({ success: false, message: 'Error during login' });
                }
                return res.json({ success: true });
            });
        } else {
            return res.json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.json({ success: false, message: 'Error during login' });
    }
};

export let doLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Error during logout');
        }
        res.redirect('/');
    });
};

export function checkAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

export function setAuthState(req, res, next) {

    if (req.session && req.session.isAuthenticated && req.session.user) {
        res.locals.isAuthenticated = true;
        res.locals.user = req.session.user;
    } else {
        res.locals.isAuthenticated = false;
        res.locals.user = null;
    }
    next();
}

export async function renderLoginPage(req, res) {
    try {
        res.render('partials/login', {
            layout: false,
            renderCss: [
                '/css/login-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).send('Internal Server Error');
    }
}
