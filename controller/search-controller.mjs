// controller/search-controller.mjs

import { getStoresByCategory, getStoresByName } from '../model/model.mjs';

export async function searchController(req, res) {
    try {
        let search = req.query.q.trim();
        search = search.charAt(0).toUpperCase() + search.slice(1);

        // First search by name
        const storeName = search;
        const searchResultsByName = await getStoresByName(storeName).map(modifySearchResult);
        
        // Then search by category
        const category = search;
        const searchResultsByCategory = await getStoresByCategory(category).map(modifySearchResult);

        // Combine the results from both searches and remove duplicates
        const searchResults = removeDuplicates([...searchResultsByName, ...searchResultsByCategory]);

        res.render('search', { 
            pageTitle: "Search for the best stores in Patras!", 
            numStores: searchResults.length, 
            stores: searchResults 
        });

    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}

function modifySearchResult(store) {
    return {
        ...store,
        image: `/images/stores/${store.name.replace(/\s+/g, '').toLowerCase()}.jpg`,
        ratingImage: `/images/stores/rating/stars${store.rating}.png`,
    };
}

function removeDuplicates(array) {
    return array.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name && t.image === value.image
        ))
    );
}