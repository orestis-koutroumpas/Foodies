// controller/checkout-controller.mjs

import { getStoresByName } from '../model/model.mjs';

// Asynchronous function to handle the checkout process
export async function checkoutController(req, res, options = {}) {
    try {
        // Destructure storeName from the route parameters
        const { storeName } = req.params;

        // Format the store name by replacing hyphens with spaces
        const formattedStoreName = storeName.replace(/-/g, ' ');

        // Fetch store data based on the formatted store name
        const storeData = await getStoresByName(formattedStoreName);

        // Check if store data is not found or the data array is empty
        if (!storeData || storeData.length === 0) {
            // Respond with a 404 status code and error message if store is not found
            res.status(404).send('Store not found');
            return;
        }

        // Access the first store object from the fetched store data
        const store = storeData[0];

        // Split the estimated delivery time string into its components
        const deliveryTimeParts = store.estimated_delivery_time.split(':');

        // Parse the minutes part of the estimated delivery time
        const estimatedMinutes = parseInt(deliveryTimeParts[1], 10);

        // Throw an error if the estimated minutes is not a valid number
        if (isNaN(estimatedMinutes)) {
            throw new Error('Invalid estimated delivery time format');
        }

        // Set the minimum delivery time to the parsed minutes
        const minDeliveryTime = estimatedMinutes;
        
        // Calculate the maximum delivery time by adding 15 minutes to the estimated time
        const maxDeliveryTime = estimatedMinutes + 15;

        // Extract user information, specifically the address, from the session data
        const user = req.session.user;
        const userAddress = user ? user.address : 'No address found';

        // Render the checkout page with all necessary data and configurations
        res.render('checkout', { 
            pageTitle: "Checkout", // Set the page title to "Checkout"
            storeId: store.id, // Include the store's unique identifier
            storeName: formattedStoreName, // Include the formatted store name
            minDeliveryTime: minDeliveryTime, // Minimum delivery time in minutes
            maxDeliveryTime: maxDeliveryTime, // Maximum delivery time in minutes
            user: user, // Include user information
            deliveryFee: store.delivery_fee, // Store's delivery fee
            address: userAddress, // User's address or a default message if not found
            renderCss: [
                '/css/checkout-styles.css' // CSS file for styling the checkout page
            ],
            cartItems: [], // Initialize cart items as an empty array, to be filled by client-side JavaScript
            totalPrice: 0, // Initialize total price as zero, to be calculated by client-side JavaScript
            isHidden: options.isHidden || false // Option to hide certain elements, defaults to false
        });
    } catch (error) {
        // Log any errors encountered during the process
        console.error('Error fetching cart data:', error);

        // Respond with a 500 status code and an error message for internal server errors
        res.status(500).send('Internal Server Error');
    }
}
