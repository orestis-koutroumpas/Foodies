// model/model.mjs

// Importing the Better SQLite library
import db from 'better-sqlite3';
//import bcrypt from 'bcrypt';

// Creating a new SQLite database connection
const sql = new db('model/db/foodies.sqlite', { fileMustExist: true });

// Function to retrieve all stores from the database
export let getAllStores = () => {
    try {
        const stmt = sql.prepare("SELECT * FROM store");
        const stores = stmt.all();
        return stores;
    } catch (error) {
        throw error;
    }
};

// Function to retrieve stores by name from the database
export let getStoresByName = (searchName) => {
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
export let getStoresByCategory = (searchCategory) => {
    try {
        const stmt = sql.prepare("SELECT * FROM store WHERE category LIKE ? ORDER BY rating DESC");
        const searchTerm = `%${searchCategory}%`;
        const stores = stmt.all(searchTerm);
        return stores;
    } catch (error) {
        throw error;
    }
};

export let getProductCategoriesByStore = (storeId) => {
    try {
        const stmt = sql.prepare(`
            SELECT GROUP_CONCAT(pc.name, ', ') AS categories
            FROM store s
            JOIN store_category sc ON s.id = sc.store_id
            JOIN product_category pc ON sc.category_id = pc.id
            WHERE s.id = ?
            GROUP BY s.id;
        `);
        const result = stmt.get(storeId);
        return result ? result.categories.split(', ') : [];
    } catch (error) {
        throw error;
    }
};



// Function to get menu items with prices for a specific store by store ID
export let getMenuItemsWithPricesByStoreId = (storeId) => {
    try {
        const stmt = sql.prepare(`
            SELECT mi.id, mi.name, mi.category, mi.description, mi.image, sm.price
            FROM menu_item mi
            JOIN menu sm ON mi.id = sm.menu_item_id
            WHERE sm.store_id = ?
        `);
        return stmt.all(storeId);
    } catch (error) {
        throw error;
    }
};

// Function to get a user by email
export let getUserByEmail = async (email) => {
    try {
        const stmt = sql.prepare("SELECT * FROM user WHERE email = ? LIMIT 1");
        const user = stmt.get(email);
        return user;
    } catch (err) {
        throw err;
    }
};

 // Function to register a user with a password
export let registerUser = async (email, password, fname, lname, address, phone_number) => {
    const user = await getUserByEmail(email);
    if (user != undefined) {
        return { message: "A user with this email already exists" };
    } else {
        try {
            // const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO user (email, password, fname, lname, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)');
            stmt.run(email, password, fname, lname, address, phone_number);
            return { message: "User registered successfully", email };
        } catch (error) {
            throw error;
        }
    }
}; 


// Updates user info
export const updateUser = async (userEmail, newFname, newLname, newAddress, newPhoneNumber) => {
    try {
        const stmt = sql.prepare(`
            UPDATE user
            SET  fname = ?, lname = ?, address = ?, phone_number = ?
            WHERE email = ?`);
        stmt.run(newFname, newLname, newAddress, newPhoneNumber, userEmail);
    } catch (error) {
        throw error;
    }
}

// Function to update user password
export const updateUserPassword = async (userEmail, newPassword) => {
    try {
        const stmt = sql.prepare(`
            UPDATE user
            SET password = ?
            WHERE email = ?`);
        stmt.run(newPassword, userEmail);
    } catch (error) {
        throw error;
    }
};

// Function to update user address
export const updateUserAddress = async (userEmail, newAddress) => {
    try {
        const stmt = sql.prepare(`
            UPDATE user
            SET address = ?
            WHERE email = ?`);
        stmt.run(newAddress, userEmail);
    } catch (error) {
        throw error;
    }
};