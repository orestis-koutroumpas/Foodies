// controller/home-controller.mjs

import { getAllStores } from '../model/model.mjs';

export async function homeController(req, res) {
    try {
        // Fetch all store data from the model
        const storesData = await getAllStores();

        // Food categories
        const foodCategories = [...new Set(storesData.map(store => store.category))].map(category => ({
            name: category,
            image: `images/food-categories/${category.toLowerCase()}.jpg`,
            alt: category
        }));

        // Partner stores
        const partnerStores = storesData.map(store => ({
            name: store.name,
            image: `images/stores/${store.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
            alt: store.name
        }));

        const data = {
            pageTitle: "The best online delivery application!",
            loggedIn: false,
            foodCategories,
            partnerStores,
            renderCss: [
                '/css/home-styles.css'
            ]
        };

        res.render('home', data);
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}