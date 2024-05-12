// model/model.mjs

import db from 'better-sqlite3'
const sql = new db('model/db/foodies.sqlite', { fileMustExist: true });

export const getAllStores = () => {
    try {
        const stmt = sql.prepare("SELECT * FROM store");
        return stmt.all();
    } catch (error) {
        throw error;
    }
};

export const getStoresByName = (searchName) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE name LIKE ?");
        const searchTerm = `%${searchName}%`; 
        return stmt.all(searchTerm);
    } catch (error) {
        throw error;
    }
}

export const getStoresByCategory = (searchCategory) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE category LIKE ?");
        const searchTerm = `%${searchCategory}%`; 
        return stmt.all(searchTerm);
    } catch (error) {
        throw error;
    }
};