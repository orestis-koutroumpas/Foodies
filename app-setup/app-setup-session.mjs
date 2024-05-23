import session from 'express-session';
import { randomBytes } from 'crypto';

// Δημιουργία ισχυρού μυστικού κωδικού
const secretKey = randomBytes(64).toString('hex');

const foodiesSession = session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Note: set to true in production with HTTPS
});

export default foodiesSession;