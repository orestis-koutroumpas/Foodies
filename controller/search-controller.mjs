// controller/search-controller.mjs

import { getStoresByCategory, getStoresByName } from '../model/model.mjs';

// Controller function for handling search requests
export async function searchController(req, res, options = {}) {
    try {
        // Extracting the search query from the request
        let search = req.query.q.trim();
        search = search.charAt(0).toUpperCase() + search.slice(1); // All lowercase
        if (search.charAt(search.length - 1) === 's') {
            search = search.slice(0, -1); // Remove last char if 's'
        }
        // First search by name
        const storeName = search;
        const searchResultsByName = await getStoresByName(storeName).map(modifySearchResult);
        // Then search by category
        const category = search;
        const searchResultsByCategory = await getStoresByCategory(category).map(modifySearchResult);

        // Combine the results from both searches and remove duplicates
        const searchResults = removeDuplicates([...searchResultsByName, ...searchResultsByCategory]);
        
        const pageTitle =  "Search for the best stores in Patras!";

        // Rendering the search results page with appropriate data
        if (searchResults.length === 0) {
            res.render('search', { 
                pageTitle: pageTitle, 
                message: "No stores found. Please try a different search term.",
                search: req.query.q.trim(),
                numStores: 0, 
                stores: [],
                renderCss: [
                    '/css/search-styles.css'
                ],
                isHidden: options.isHidden || false
            });
        } else {
            res.render('search', { 
                pageTitle: pageTitle, 
                search: req.query.q.trim(),
                numStores: searchResults.length, 
                stores: searchResults,
                renderCss: [
                    '/css/search-styles.css',
                ],
                isHidden: options.isHidden || false
            });
        }

    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Function to modify the search results by adding image paths and rating images
function modifySearchResult(store) {
    return {
        ...store,
        image: `/images/stores/${store.name.replace(/\s+/g, '').toLowerCase()}.jpg`,
        ratingImage: `/images/stores/rating/stars${store.rating}.png`,
    };
}

// Function to remove duplicate entries from an array of objects based on name and image
function removeDuplicates(array) {
    return array.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.name === value.name && t.image === value.image
        ))
    );
}
