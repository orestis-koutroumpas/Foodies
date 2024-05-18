// controller/checkout-controller.mjs

export async function checkoutController(req, res) {
    try {
        // Sample data for cart items
        const cartItems = [
            {
                name: 'Bbq Burger',
                image: '/images/store-items/menu-items/burgers/bbq_burger.avif',
                price: 10,
                quantity: 1
            },
            {
                name: 'Chicken Burger',
                image: '/images/store-items/menu-items/burgers/chicken_burger.avif',
                price: 15,
                quantity: 1
            },
            {
                name: 'Amita Motion',
                image: '/images/store-items/menu-items/drinks/amita_motion.avif',
                price: 5.80,
                quantity: 1
            },
            {
                name: 'Coca Cola Light',
                image: '/images/store-items/menu-items/drinks/coca_cola_light.avif',
                price: 10.50,
                quantity: 1
            }
        ];

        const totalPrice = 41.3;

        // Render the checkout page with sample data
        res.render('checkout', { 
            pageTitle: "Checkout",
            storeName: "Burger Place",
            minDeliveryTime: 15,
            maxDeliveryTime: 25,
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