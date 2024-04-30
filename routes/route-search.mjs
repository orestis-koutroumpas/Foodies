import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    // Sample data for demonstration
    const searchResults = [
        {
            name: 'Burger Park',
            image: '/images/stores/burger_park.jpg',
            ratingImage: '/images/stores/stars5.png',
            category: 'Burgers',
            deliveryTime: '40\'',
            minimumOrder: '5,50€',
            deliveryFee: '0,10€',
            description: 'Tasty burgers, unique flavours and the classic combinations of Burger Park!'
        },
        {
            name: 'Henderson\'s',
            image: '/images/stores/hendersons.jpg',
            ratingImage: '/images/stores/stars4.png',
            category: 'Sandwiches',
            deliveryTime: '35\'',
            minimumOrder: '6,50€',
            deliveryFee: '0,50€',
            description: 'Tasty sandwiches in various combinations, for all tastes! With every purchase over 25€ 1 Coca Cola 1.5 l FREE!'
        },
        {
            name: 'Crepes Go',
            image: '/images/stores/crepesgo.jpg',
            ratingImage: '/images/stores/stars3.png',
            category: 'Crepes',
            deliveryTime: '35\'',
            minimumOrder: '4,20€',
            deliveryFee: '1,10€',
            description: 'Best crepes in town!'
        }
    ];

    res.render('search', { pageTitle: "Search for the best stores in Patras!", numStores: searchResults.length, stores: searchResults });
});

export default router;