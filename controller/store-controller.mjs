// controller/store-controller.mjs

export async function storeController(req, res) {
    try {
        const storeName = req.params.storeName; // Get the store name from the URL
        const formattedStoreName = storeName.replace(/-/g, ' '); // Replace '-' with spaces
        res.render('store', { pageTitle: formattedStoreName });
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}