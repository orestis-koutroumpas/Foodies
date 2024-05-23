// controller/checkout-controller.mjs

import { getStoresByName } from '../model/model.mjs';

export async function checkoutController(req, res, options = {}) {
    try {
        const { storeName } = req.params;
        const formattedStoreName = storeName.replace(/-/g, ' ');

        const storeData = await getStoresByName(formattedStoreName);

        if (!storeData || storeData.length === 0) {
            res.status(404).send('Store not found');
            return;
        }

        const store = storeData[0];

        const deliveryTimeParts = store.estimated_delivery_time.split(':');
        const estimatedMinutes = parseInt(deliveryTimeParts[1], 10);

        if (isNaN(estimatedMinutes)) {
            throw new Error('Invalid estimated delivery time format');
        }

        const minDeliveryTime = estimatedMinutes;
        const maxDeliveryTime = estimatedMinutes + 15;

        // Extract user address from session
        const user = req.session.user;
        const userAddress = user ? user.address : 'No address found';

        res.render('checkout', { 
            pageTitle: "Checkout",
            storeName: formattedStoreName,
            minDeliveryTime: minDeliveryTime,
            maxDeliveryTime: maxDeliveryTime,
            address: userAddress,
            renderCss: [
                '/css/checkout-styles.css'
            ],
            cartItems: [], // Will be populated by client-side JavaScript
            totalPrice: 0, // Will be populated by client-side JavaScript
            isHidden: options.isHidden || false
        });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).send('Internal Server Error');
    }
}