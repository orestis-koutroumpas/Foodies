import pg from 'pg';
import dotenv from 'dotenv';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
         rejectUnauthorized: false 
    }
});

async function connect() {
    try {
        const client = await pool.connect();
        return client;
    }
    catch(e) {
        console.error(`Failed to connect ${e}`);
    }
}

