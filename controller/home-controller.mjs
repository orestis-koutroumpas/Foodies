// controller/home-controller.mjs

import { getAllStores } from '../model/model.mjs';

export async function homeController(req, res, options = {}) {
    try {
        // Fetch all store data from the model
        const storesData = await getAllStores();

        // Food categories
        const foodCategories = storesData.reduce((categories, store) => {
            const existingCategory = categories.find(category => category.name === store.category);
            if (existingCategory) {
                existingCategory.storesNumber++;
            } else {
                categories.push({
                    image: `images/food-categories/${store.category.toLowerCase()}.jpg`,
                    alt: store.category,
                    name: store.category,
                    storesNumber: 1 // Initialize with 1 for the first store in the category
                });
            }
            return categories;
        }, []);

        // Partner stores
        const partnerStores = storesData.map(store => ({
            name: store.name,
            image: `images/stores/${store.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
            alt: store.name,
            rating: `images/stores/rating/stars${store.rating}.png`
        }));
        
        const data = {
            pageTitle: "The best online delivery application!",
            foodCategories,
            partnerStores,
            renderCss: [
                '/css/home-styles.css'
            ],
            isHidden: options.isHidden || false,
            isAuthenticated: res.locals.isAuthenticated ,
            user: res.locals.user
        };

        console.log(data);
        res.render('home', data);

    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}