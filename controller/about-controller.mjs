//about-controller.mjs

export async function aboutController(req, res) { 
    try {
        res.render('about', {pageTitle: "About Us"});
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');    
    }
}