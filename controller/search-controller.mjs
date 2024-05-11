//search-controller.mjs

export async function searchController(req, res) {
    try {
        // Sample data for demonstration
        const searchResults = [
            {
                name: 'Burger Park',
                image: '/images/stores/burgerpark.jpg',
                rating: '/images/stores/rating/stars5.png',
                category: 'Burgers',
                deliveryTime: '40\'',
                minimumOrder: '5,50€',
                deliveryFee: '0,10€',
                description: 'Tasty burgers, unique flavours and the classic combinations of Burger Park!'
            },
            {
                name: 'Henderson\'s',
                image: '/images/stores/hendersons.jpg',
                rating: '/images/stores/rating/stars4.png',
                category: 'Sandwiches',
                deliveryTime: '35\'',
                minimumOrder: '6,50€',
                deliveryFee: '0,50€',
                description: 'Tasty sandwiches in various combinations, for all tastes! With every purchase over 25€ 1 Coca Cola 1.5 l FREE!'
            },
            {
                name: 'Crepes Go',
                image: '/images/stores/crepesgo.jpg',
                rating: '/images/stores/rating/stars3.png',
                category: 'Crepes',
                deliveryTime: '35\'',
                minimumOrder: '4,20€',
                deliveryFee: '1,10€',
                description: 'Best crepes in town!'
            }
        ];

        res.render('search', { pageTitle: "Search for the best stores in Patras!", numStores: searchResults.length, stores: searchResults });
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}