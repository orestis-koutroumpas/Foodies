// controller/store-controller.mjs

import { getStoresByName, getProductCategoriesByStore, getMenuItemsWithPricesByStoreId } from '../model/model.mjs'; // Import necessary functions from the model

// Function to handle store details rendering
export async function storeController(req, res) {
    try {
        const storeName = req.params.storeName; // Get the store name from the URL, with '-'
        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces

        const storeData = getStoresByName(formattedStoreName); // Fetch store data by the formatted store name

        // If no store data is found, return a 404 error
        if (!storeData || storeData.length === 0) {
            res.status(404).send('Store not found');
            return;
        }

        const store = storeData[0]; // Access the first store object
        const deliveryHours = formatDeliveryHours(store.delivery_times); // Format delivery hours
        const openUntil = getOpenUntil(deliveryHours); // Get open until time
        const bannerImageUrl = `/images/store-items/Banners/${formattedStoreName}.avif`; // Set banner image URL

        // Get the menu items with prices for this store
        const menuItemsWithPrices = getMenuItemsWithPricesByStoreId(store.id);

        // Prepare view data for rendering
        const viewData = {
            pageTitle: formattedStoreName,
            storeName: formattedStoreName,
            deliveryCost: `${store.delivery_fee} €`,
            minimumOrder: `${store.min_order} €`,
            deliveryTime: `${store.estimated_delivery_time.split(':')[1]}`,
            openUntil: openUntil,
            Rating: store.rating,
            bannerImageUrl: bannerImageUrl,
            category: store.category, // Include the store category
            menuItems: menuItemsWithPrices, // Add menu items with prices to the view data
            renderCss: [
                '/css/store-styles.css' // CSS for store page
            ]
        };

        // Render the store page with the view data
        res.render('store', viewData);
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to get store information as JSON
export async function getStoreInfo(req, res) {
    try {
        const storeName = req.params.storeName.replace(/-/g, ' '); // Format the store name from URL
        const stores = getStoresByName(storeName); // Fetch store data by the formatted store name

        // If no store data is found, return a 404 error
        if (stores.length === 0) {
            res.status(404).json({ error: 'Store not found' });
            return;
        }

        const store = stores[0]; // Access the first store object
        const deliveryHours = formatDeliveryHours(store.delivery_times); // Format delivery hours
        const openUntil = getOpenUntil(deliveryHours); // Get open until time

        // Prepare store information for response
        const storeInfo = {
            id: store.id, // Include id in the response
            deliveryHours: deliveryHours,
            address: store.address,
            phone: store.phone_number,
            category: store.category
        };

        // Send store information as JSON
        res.json(storeInfo);
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to get product categories by store as JSON
export async function getTabsByCategory(req, res) {
    try {
        const { storeId } = req.params; // Extract store ID from request parameters

        const productCategories = await getProductCategoriesByStore(storeId); // Fetch product categories by store ID
        
        // Send product categories as JSON
        res.json(productCategories);
    } catch (error) {
        // Log the error and send a 500 error response
        console.error('Error fetching tabs data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to format delivery hours from string to object
function formatDeliveryHours(deliveryHours) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formattedHours = {};

    // Default all days to "Closed"
    days.forEach(day => {
        formattedHours[day] = 'Closed';
    });

    // Split the delivery hours by comma
    const hoursArray = deliveryHours.split(', ');

    hoursArray.forEach(hourEntry => {
        // Split each entry by colon to separate the day(s) from the time
        const [daysPart, timePart] = hourEntry.split(': ');
        const dayRanges = daysPart.split('-');

        if (dayRanges.length === 2) {
            // If we have a range of days (e.g., Mon-Sat), fill in those days
            const startDay = days.findIndex(day => day.startsWith(dayRanges[0]));
            const endDay = days.findIndex(day => day.startsWith(dayRanges[1]));

            for (let i = startDay; i <= endDay; i++) {
                formattedHours[days[i]] = timePart;
            }
        } else {
            // Single day entry
            const day = days.find(day => day.startsWith(dayRanges[0]));
            if (day) {
                formattedHours[day] = timePart;
            }
        }
    });

    return formattedHours;
}

// Function to get the closing time for the current day
function getOpenUntil(deliveryHours) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); // Get the current day index
    const dayName = days[today]; // Get the current day name

    const openHours = deliveryHours[dayName]; // Get the delivery hours for today

    return openHours === 'Closed' ? 'Closed' : openHours.split(' - ')[1]; // Return the closing time or 'Closed'
}
