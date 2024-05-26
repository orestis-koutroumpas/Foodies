// controller/cart-controller.mjs

import { getStoresByName } from '../model/model.mjs';

// Function to handle cart operations
export async function cartController(req, res) {
    try {
        // Get the store name from the route parameters
        const storeName = req.params.storeName;

        // If no store name is provided, return a 400 error
        if (!storeName) {
            res.status(400).send('Store name is required');
            return;
        }

        // Replace '-' with spaces in the store name
        const formattedStoreName = storeName.replace(/-/g, ' ');

        // Fetch store data by the formatted store name
        const storeData = getStoresByName(formattedStoreName);

        // If no store data is found, return a 404 error
        if (!storeData || storeData.length === 0) {
            res.status(404).send('Store not found');
            return;
        }

        // Access the first store object from the returned data
        const store = storeData[0];

        // Calculate delivery time from the estimated delivery time string
        const deliveryTimeParts = store.estimated_delivery_time.split(':');
        const estimatedMinutes = parseInt(deliveryTimeParts[1], 10);
        const minimumOrder = store.min_order;

        // If estimated minutes is not a valid number, throw an error
        if (isNaN(estimatedMinutes)) {
            throw new Error('Invalid estimated delivery time format');
        }

        // Format the delivery time
        const deliveryTime = `${estimatedMinutes}'`;

        // Render the cart modal partial with the required data
        res.render('partials/cart-modal', {
            layout: false, // Ensure no layout is used for partial rendering
            deliveryTime: deliveryTime,
            minimumOrder: minimumOrder,
            renderCss: [
                '/css/cart-modal-styles.css' // CSS for cart modal
            ]
        });
    } catch (error) {
        // Log the error and return a 500 error
        console.error('Error rendering cart modal:', error);
        res.status(500).send('Internal Server Error');
    }
}
