// controller/store-controller.mjs

import { getStoresByName } from '../model/model.mjs';


export async function storeController(req, res) {
    try {
        const storeName = req.params.storeName; // Get the store name from the URL, with '-'
        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces
        const store = await getStoresByName(formattedStoreName);
        
        res.render('store', { 
            pageTitle: formattedStoreName,
            storeName: storeName,
            deliveryCost: `${store.delivery_fee} €`,
            minimumOrder: `${store.min_order} €`,
            deliveryTime: `${store.estimated_delivery_time}`,
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