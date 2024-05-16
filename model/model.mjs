// model/model.mjs

// Importing the Better SQLite library
import db from 'better-sqlite3';
// Creating a new SQLite database connection
const sql = new db('model/db/foodies.sqlite', { fileMustExist: true });

// Function to retrieve all stores from the database
export const getAllStores = () => {
    try {
        const stmt = sql.prepare("SELECT * FROM store");
        const stores = stmt.all();
        return stores;
    } catch (error) {
        throw error;
    }
};

// Function to retrieve stores by name from the database
export const getStoresByName = (searchName) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE name LIKE ? ORDER BY rating DESC");
        const searchTerm = `%${searchName}%`;
        const stores =  stmt.all(searchTerm);
        return stores;
    } catch (error) {
        throw error;
    }
};

// Function to retrieve stores by category from the database
export const getStoresByCategory = (searchCategory) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE category LIKE ? ORDER BY rating DESC");
        const searchTerm = `%${searchCategory}%`;
        const stores = stmt.all(searchTerm);
        return stores;
    } catch (error) {
        throw error;
    }
};