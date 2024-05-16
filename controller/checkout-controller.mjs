// controller/checkout-controller.mjs

export async function checkoutController(req, res) {
    try {
        // Sample data for cart items
        const cartItems = [
            {
                name: 'Freddo Espresso',
                image: '/images/food/coffee.jpg',
                price: 10,
                quantity: 1
            },
            {
                name: 'Classic Burger',
                image: '/images/food/burger.jpg',
                price: 15,
                quantity: 1
            },
            {
                name: 'Crepe',
                image: '/images/food/crepes.jpg',
                price: 5.80,
                quantity: 1
            },
            {
                name: 'Pizza Margarita',
                image: '/images/food/pizza.jpg',
                price: 10.50,
                quantity: 1
            }
        ];

        const totalPrice = 41.3;

        // Render the checkout page with sample data
        res.render('checkout', { 
            pageTitle: "Checkout",
            storeName: "Burger Place",
            deliveryTime: 15,
            address: "Karolou 14",
            renderCss: [
                '/css/checkout-styles.css'
            ],
            cartItems: cartItems,
            totalPrice: totalPrice
        });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).send('Internal Server Error');
    }
}