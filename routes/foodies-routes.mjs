// routes/foodies-routes.mjs

// Import necessary modules and controllers
import express from 'express';
import { homeController } from '../controller/home-controller.mjs';
import { footerPagesController } from '../controller/footer-pages-controller.mjs';
import { getStoreInfo, getTabsByCategory } from '../controller/store-controller.mjs';
import { getMenuItemsWithPricesByStoreId, searchProducts } from '../model/model.mjs';
import { cartController } from '../controller/cart-controller.mjs';
import { doLogin, doRegister, doLogout, checkAuthenticated, renderLoginPage } from '../controller/login-controller.mjs';
import { updateAddress, userProfileController, updateUserInfo, changeUserPassword } from '../controller/user-profile-controller.mjs';
import { submitOrder } from '../controller/order-controller.mjs';

const router = express.Router(); // Create a new router instance

// Define routes and their corresponding controllers

// Home page route
router.get('/', homeController);

// Render login page route
router.get('/login', renderLoginPage);

// Login route
router.post('/login', doLogin);

// Signup route
router.post('/signup', doRegister);

// Login route
router.get('/login', doLogin);

// Logout route
router.get('/logout', doLogout);

// Protect user-profile route with authentication middleware
router.get('/user-profile', checkAuthenticated, async (req, res) => {
    userProfileController(req, res, { isHidden: true }); // Render user profile page
});

// Update user profile route
router.post('/user-profile', checkAuthenticated, async (req, res) => {
    updateUserInfo(req, res); // Handle user info update
});

// Change user password route
router.post('/user-profile/change-password', checkAuthenticated, async (req, res) => {
    changeUserPassword(req, res); // Handle password change
});

// Home page route with additional options
router.get('/home', async (req, res) => {
    const { homeController } = await import(`../controller/home-controller.mjs`);
    homeController(req, res, { isHidden: true }); // Render home page
});

// Update address route
router.post('/update-address', checkAuthenticated, updateAddress);

// Search page route
router.get('/search', async (req, res) => {
    const { searchController } = await import(`../controller/search-controller.mjs`);
    searchController(req, res, { isHidden: true }); // Handle search
});

// Get tabs by category route
router.get('/api/tabs/:storeId', getTabsByCategory);

// Store page route
router.get('/store/:storeName', async (req, res) => {
    const { storeController } = await import(`../controller/store-controller.mjs`);
    storeController(req, res); // Render store page
});

// Get menu items with prices by store ID route
router.get('/api/menu-items/:storeId', async (req, res) => {
    try {
        const { storeId } = req.params;
        const menuItemsWithPrices = getMenuItemsWithPricesByStoreId(storeId); // Fetch menu items
        res.json(menuItemsWithPrices); // Send response as JSON
    } catch (error) {
        console.error('Error fetching menu items:', error); // Log error
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

// Get store information route
router.get('/api/store-info/:storeName', getStoreInfo);

// Cart modal route
router.get('/store/:storeName/cart-modal', cartController);

// Search products route
router.get('/api/search-products', async (req, res) => {
    const storeName = req.query.store;
    const query = req.query.q;

    try {
        const result = searchProducts(storeName, query); // Search for products
        res.json(result); // Send response as JSON
    } catch (error) {
        console.error('Error searching products:', error); // Log error
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    }
});

// Checkout status route
router.get('/store/:storeName/checkout-status', (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({ isAuthenticated: true }); // Send authenticated status
    } else {
        res.status(401).json({ isAuthenticated: false }); // Send unauthenticated status
    }
});

// Checkout route with authentication check
router.get('/store/:storeName/checkout', checkAuthenticated, async (req, res) => {
    const { checkoutController } = await import(`../controller/checkout-controller.mjs`);
    checkoutController(req, res, { isHidden: true }); // Render checkout page
});

// Submit order route
router.post('/submit-order', checkAuthenticated, submitOrder);

// Footer pages routes (e.g., About, Privacy Policy, Terms of Use)
router.get('/about', footerPagesController);
router.get('/privacy-policy', footerPagesController);
router.get('/terms-of-use', footerPagesController);

// Redirect root route to home page
router.route('/').get((req, res) => { 
    res.redirect('/home');
});

export default router; // Export the router instance
