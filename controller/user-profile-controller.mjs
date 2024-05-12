//user-profile.controller.mjs

export async function userProfileController(req, res) {
    try {
        res.render('user-profile', {pageTitle: "User Profile"});
    } catch (error) {
        console.error('Error fetching store data:', error);
        res.status(500).send('Internal Server Error');
    }
}