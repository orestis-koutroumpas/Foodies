import session from 'express-session';
import { randomBytes } from 'crypto';

// Δημιουργία ισχυρού μυστικού κωδικού
const secretKey = randomBytes(64).toString('hex');

const taskListSession = session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
});

export default taskListSession;