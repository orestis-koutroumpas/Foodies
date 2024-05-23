// controller/cart-controller.mjs

import { getStoresByName } from '../model/model.mjs';

export async function cartController(req, res) {
    try {
        
        const storeName = req.params.storeName; // Get the store name from the route parameters

        if (!storeName) {
            res.status(400).send('Store name is required');
            return;
        }

        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces

        const storeData = await getStoresByName(formattedStoreName);

        if (!storeData || storeData.length === 0) {
            res.status(404).send('Store not found');
            return;
        }

        const store = storeData[0]; // Access the first store object

        // Calculate delivery time
        const deliveryTimeParts = store.estimated_delivery_time.split(':');

        const estimatedMinutes = parseInt(deliveryTimeParts[1], 10);

        if (isNaN(estimatedMinutes)) {
            throw new Error('Invalid estimated delivery time format');
        }

        const deliveryTime = `${estimatedMinutes}'`;

        res.render('partials/cart-modal', {
            layout: false, // Ensure no layout is used for partial rendering
            deliveryTime: deliveryTime,
            renderCss: [
                '/css/cart-modal-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error rendering cart modal:', error);
        res.status(500).send('Internal Server Error');
    }
}