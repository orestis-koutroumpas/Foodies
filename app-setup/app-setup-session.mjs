// app-setup-session.mjs
import session from 'express-session';
import { randomBytes } from 'crypto';
import connectSqlite3 from 'connect-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const secretKey = process.env.SESSION_SECRET || randomBytes(64).toString('hex');

const sessionsDir = path.resolve('model/sessions');
if (!fs.existsSync(sessionsDir)) {
    fs.mkdirSync(sessionsDir, { recursive: true });
    console.log('Sessions directory created:', sessionsDir);
}

const SQLiteStore = connectSqlite3(session);

const foodiesSession = session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'session.sqlite', dir: sessionsDir }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});

export default foodiesSession;
