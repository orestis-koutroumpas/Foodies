// controller/order-controller.mjs

import { insertOrder, insertOrderContent, getMenuItemIdByName } from '../model/model.mjs';

export const submitOrder = async (req, res) => {
    const { userEmail, storeId, deliveryAddress, price, tip, items } = req.body;

    try {
        const orderId = insertOrder(userEmail, storeId, deliveryAddress, price, tip);

        for (const item of items) {
            console.log('Processing item:', item);
            const menuItemId = getMenuItemIdByName(item.name);
            console.log('Menu item ID:', menuItemId);
            insertOrderContent(orderId, menuItemId, item.comment);
        }

        res.status(200).json({ message: 'Order submitted successfully' });
    } catch (error) {
        console.error('Error submitting order:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
