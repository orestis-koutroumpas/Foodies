// controller/order-controller.mjs

import { insertOrder, insertOrderContent, getMenuItemIdByName, insertPayment } from '../model/model.mjs'; // Import necessary functions from the model

// Function to handle order submission
export const submitOrder = async (req, res) => {
    // Destructure order details from the request body
    const { userEmail, storeId, deliveryAddress, orderPrice, tip, items, method, paymentAmount } = req.body;

    try {
        // Insert order details and get the generated order ID
        const orderId = insertOrder(userEmail, storeId, deliveryAddress, orderPrice, tip);

        // Loop through each item in the order
        for (const item of items) {
            // Get the menu item ID by item name
            const menuItemId = getMenuItemIdByName(item.name);
            // Insert order content for each item
            insertOrderContent(orderId, menuItemId, item.comment);
        }

        // Insert payment details
        insertPayment(orderId, userEmail, paymentAmount, method);        

        // Send success response
        res.status(200).json({ message: 'Order and payment submitted successfully' });
    } catch (error) {
        // Log the error and send error response
        console.error('Error submitting order:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
