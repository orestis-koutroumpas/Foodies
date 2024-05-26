// model/model.mjs

// Importing the Better SQLite library
import db from 'better-sqlite3';
import bcrypt from 'bcryptjs';

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


// Function to retrieve the menu item ID based on the name
export let getMenuItemIdByName = (name) => {
    try {
        const stmt = sql.prepare("SELECT id FROM menu_item WHERE name = ? LIMIT 1");
        const menuItem = stmt.get(name);
        return menuItem ? menuItem.id : null;
    } catch (error) {
        throw error;
    }
};

// Function to search products by store name and query
export let searchProducts = (storeName, query) => {
    try {
        const categoriesStmt = sql.prepare(`
            SELECT DISTINCT pc.id, pc.name
            FROM product_category pc
            JOIN category_item ci ON pc.id = ci.category_id
            JOIN menu_item mi ON ci.menu_item_id = mi.id
            JOIN menu m ON mi.id = m.menu_item_id
            JOIN store s ON m.store_id = s.id
            WHERE s.name = ? AND (mi.name LIKE ? OR pc.name LIKE ?)
        `);
        const searchTerm = `%${query}%`;
        const categories = categoriesStmt.all(storeName, searchTerm, searchTerm);

        const productsStmt = sql.prepare(`
            SELECT mi.id, mi.name, mi.description, mi.image, m.price, pc.name as category
            FROM menu_item mi
            JOIN category_item ci ON mi.id = ci.menu_item_id
            JOIN product_category pc ON ci.category_id = pc.id
            JOIN menu m ON mi.id = m.menu_item_id
            JOIN store s ON m.store_id = s.id
            WHERE s.name = ? AND mi.name LIKE ?
        `);
        const products = productsStmt.all(storeName, searchTerm);

        return { categories, products };
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
            const hashedPassword = await bcrypt.hash(password, 10);
            const stmt = sql.prepare('INSERT INTO user (email, password, fname, lname, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)');
            stmt.run(email, hashedPassword, fname, lname, address, phone_number);
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

// Function to retrieve previous orders for a user
export let getOrdersByUserEmail = (email) => {
    try {
        const stmt = sql.prepare(`
            SELECT o.*, s.name as store_name
            FROM "order" o
            JOIN "store" s ON o.store_id = s.id
            WHERE o.user_email = ?
            ORDER BY o.date_of_order DESC
        `);
        const orders = stmt.all(email);
        return orders;
    } catch (error) {
        throw error;
    }
};

// Function to insert a new order
export let insertOrder = (userEmail, storeId, deliveryAddress, price, tip) => {
    try {
        const stmt = sql.prepare(`
            INSERT INTO "order" (user_email, store_id, date_of_order, delivery_address, price, tip)
            VALUES (?, ?, DATE('now'), ?, ?, ?)
        `);
        const info = stmt.run(userEmail, storeId, deliveryAddress, price, tip);
        return info.lastInsertRowid;
    } catch (error) {
        throw error;
    }
};

// Function to insert order content
export let insertOrderContent = (orderId, menuItemId, comment) => {
    try {
        const stmt = sql.prepare(`
            INSERT INTO order_content (order_id, menu_item_id, comment)
            VALUES (?, ?, ?)
        `);
        stmt.run(orderId, menuItemId, comment);
    } catch (error) {
        throw error;
    }
};

export let insertPayment = (orderId, userEmail, amount, method) => {
    try {
        const stmt = sql.prepare(`
            INSERT INTO payment (order_id, user_email, amount, method)
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(orderId, userEmail, amount, method);
    } catch (error) {
        throw error;
    }
};


export default sql;