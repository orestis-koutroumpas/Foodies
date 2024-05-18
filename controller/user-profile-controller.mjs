//user-profile.controller.mjs

export async function userProfileController(req, res) {
    try {
        // Fake user data
        const user = {
            email: 'user@example.com',
            fname: 'John',
            lname: 'Doe',
            address: '123 Main St, Springfield',
            phone_number: '123-456-7890'
        };

        res.render('user-profile', {
            pageTitle: "User Profile",
            user,
            renderCss: [
                '/css/user-profile-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error fetching user profile data:', error);
        res.status(500).send('Internal Server Error');
    }
}
