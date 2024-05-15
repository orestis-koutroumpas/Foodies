// controller/store-controller.mjs

import { getStoresByName } from '../model/model.mjs'
export async function storeController(req, res) {
    try {
        const storeName = req.params.storeName; // Get the store name from the URL
        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces
        const stores = await getStoresByName(formattedStoreName);
        if (!stores || stores.length === 0) {
            return res.status(404).send('Store not found');
        }
        const store = stores[0];
        res.render('store', { 
            pageTitle: store.name,
            storeName: store.name,
            deliveryCost: `${store.delivery_fee} €`,
            minimumOrder: `${store.min_order} €`,
            deliveryTime: `${store.estimated_delivery_time.split(':')[1]}`,
            openUntil: ": 11.45 a.m",
            Rating: store.rating,
            renderCss: [
                '/css/store-styles.css'
            ]
         });
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}