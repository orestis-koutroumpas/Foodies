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
