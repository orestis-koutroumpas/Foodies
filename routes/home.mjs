import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    // Data to pass to the template
    const data = {
        pageTitle: "Foodies | The best online delivery application!",
        foodCategories: [
            { name: 'Burger', image: 'images/food/burger.jpg', alt: 'Burger' },
            { name: 'Coffee', image: 'images/food/coffee.jpg', alt: 'Coffee' },
            { name: 'Pizza', image: 'images/food/pizza.jpg', alt: 'Pizza' },
            { name: 'Pancakes', image: 'images/food/pancakes.jpg', alt: 'Pancakes' },
            { name: 'Crepes', image: 'images/food/crepes.jpg', alt: 'Crepes' },
            { name: 'Sandwich', image: 'images/food/sandwich.jpg', alt: 'Sandwich' },
            { name: 'Burger', image: 'images/food/burger.jpg', alt: 'Burger' },
            { name: 'Coffee', image: 'images/food/coffee.jpg', alt: 'Coffee' },
            { name: 'Pizza', image: 'images/food/pizza.jpg', alt: 'Pizza' },
            { name: 'Pancakes', image: 'images/food/pancakes.jpg', alt: 'Pancakes' },
            { name: 'Crepes', image: 'images/food/crepes.jpg', alt: 'Crepes' },
            { name: 'Sandwich', image: 'images/food/sandwich.jpg', alt: 'Sandwich' }
        ],
        partnerStores: [
            { name: 'Burger Park', image: 'images/stores/burger_park.jpg', alt: 'Burger Park' },
            { name: 'Coffeelab', image: 'images/stores/coffeelab.jpg', alt: 'Coffeelab' },
            { name: 'Hendersons', image: 'images/stores/hendersons.jpg', alt: 'Hendersons' },
            { name: 'Pizzeria', image: 'images/stores/pizzeria.jpg', alt: 'Pizzeria' },
            { name: 'Crepesgo', image: 'images/stores/crepesgo.jpg', alt: 'Crepesgo' },
            { name: 'Fresh', image: 'images/stores/fresh.jpg', alt: 'Fresh' }
        ]
    };
    // Render the 'home' template with data
    res.render('home', data);
});

export default router;