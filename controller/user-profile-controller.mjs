// controller/user-profile.controller.mjs

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
            userEmail: user.email,
            userFname: user.fname,
            userLname: user.lname,
            userAddress: user.address,
            userPhoneNumber: user.phone_number,
            renderCss: [
                '/css/user-profile-styles.css'
            ]
        });
    } catch (error) {
        console.error('Error fetching user profile data:', error);
        res.status(500).send('Internal Server Error');
    }
}

export async function printUserProfile(user) {
    console.log(user);
}