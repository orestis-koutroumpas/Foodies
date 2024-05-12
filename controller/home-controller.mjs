// controller/home-controller.mjs

import { getAllStores } from '../model/model.mjs';

export async function homeController(req, res) {
    try {
        // Fetch all store data from the model
        const storesData = await getAllStores();

        const foodCategories = [...new Set(storesData.map(store => store.category))].map(category => ({
            name: category,
            image: `images/food/${category.toLowerCase()}.jpg`,
            alt: category
        }));

        const partnerStores = storesData.map(store => ({
            name: store.name,
            image: `images/stores/${store.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
            alt: store.name
        }));

        const data = {
            pageTitle: "The best online delivery application!",
            foodCategories,
            partnerStores
        };

        res.render('home', data);
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}