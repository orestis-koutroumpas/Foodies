// controller/store-controller.mjs

export async function storeController(req, res) {
    try {
        const storeName = "Example"
        res.render('store', {pageTitle: storeName});
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}