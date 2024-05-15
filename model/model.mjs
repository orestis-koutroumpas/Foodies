// model/model.mjs

import db from 'better-sqlite3'
const sql = new db('model/db/foodies.sqlite', { fileMustExist: true });

export const getAllStores = () => {
    try {
        const stmt = sql.prepare("SELECT * FROM store");
        const stores = stmt.all();
        return stores;
    } catch (error) {
        throw error;
    }
};

export const getStoresByName = (searchName) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE name LIKE ? ORDER BY rating DESC");
        const searchTerm = `%${searchName}%`; 
        const stores =  stmt.all(searchTerm);
        return stores;
    } catch (error) {
        throw error;
    }
}

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
