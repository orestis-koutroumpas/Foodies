// controller/store-controller.mjs

import { getStoresByName, getProductCategoriesByStore, getMenuItemsWithPricesByStoreId } from '../model/model.mjs';


export async function storeController(req, res) {
    try {
        const storeName = req.params.storeName; // Get the store name from the URL, with '-'
        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces

        const storeData =  getStoresByName(formattedStoreName);

        if (!storeData || storeData.length === 0) {
            res.status(404).send('Store not found');
            return;
        }

        const store = storeData[0]; // Access the first store object
        const deliveryHours = formatDeliveryHours(store.delivery_times);
        const openUntil = getOpenUntil(deliveryHours);
        const bannerImageUrl = `/images/store-items/Banners/${formattedStoreName}.avif`;

        // Get the menu items with prices for this store
        const menuItemsWithPrices =  getMenuItemsWithPricesByStoreId(store.id);


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
                '/css/store-styles.css'
            ]
        };


        res.render('store', viewData);
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getStoreInfo(req, res) {
    try {
        const storeName = req.params.storeName.replace(/-/g, ' '); // Format the store name from URL
        const stores =  getStoresByName(storeName);

        if (stores.length === 0) {
            res.status(404).json({ error: 'Store not found' });
            return;
        }

        const store = stores[0];
        const deliveryHours = formatDeliveryHours(store.delivery_times);
        const openUntil = getOpenUntil(deliveryHours);

        const storeInfo = {
            id: store.id, // Include id in the response
            deliveryHours: deliveryHours,
            address: store.address,
            phone: store.phone_number,
            category: store.category
        };

        res.json(storeInfo);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getTabsByCategory(req, res) {
    try {
        const { storeId } = req.params;

        const productCategories = await getProductCategoriesByStore(storeId);
        
        res.json(productCategories);
    } catch (error) {
        console.error('Error fetching tabs data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


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

function getOpenUntil(deliveryHours) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay(); 
    const dayName = days[today];

    const openHours = deliveryHours[dayName];

    return openHours === 'Closed' ? 'Closed' : openHours.split(' - ')[1];
}