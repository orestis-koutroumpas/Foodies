//store-controller.mjs

export async function storeController(req, res) {
    try {
        res.write("Store Page");
        res.end();
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}