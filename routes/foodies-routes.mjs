// routes/foodies-routes.mjs

import express from 'express';
import { footerPagesController } from '../controller/footer-pages-controller.mjs';
import { getStoreInfo, getTabsByCategory } from '../controller/store-controller.mjs';
import { getMenuItemsWithPricesByStoreId } from '../model/model.mjs';
import { cartController } from '../controller/cart-controller.mjs';
import foodiesSession from '../app-setup/app-setup-session.mjs';
import { doLogin, doRegister, doLogout, checkAuthenticated, setAuthState, renderLoginPage } from '../controller/login-controller.mjs';
import { updateAddress } from '../controller/update-address-controller.mjs';


const router = express.Router();

router.use(foodiesSession);

// Apply middleware to all routes
router.use(setAuthState);

router.post('/login', doLogin);
router.post('/signup', doRegister);
router.get('/logout', doLogout);

router.route('/').get((req, res) => { 
    res.redirect('/home') 
});

router.get('/home', async (req, res) => {
    const { homeController } = await import(`../controller/home-controller.mjs`);
    homeController(req, res, { isHidden: true });
});

router.get('/login', renderLoginPage);

router.get('/search', async (req, res) => {
    const { searchController } = await import(`../controller/search-controller.mjs`);
    searchController(req, res, { isHidden: true });
});

router.get('/store/:storeName', async (req, res) => {
    const { storeController } = await import(`../controller/store-controller.mjs`);
    storeController(req, res);
});

router.get('/api/menu-items/:storeId', async (req, res) => {
    try {
        const { storeId } = req.params;
        const menuItemsWithPrices = await getMenuItemsWithPricesByStoreId(storeId);
        res.json(menuItemsWithPrices);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/store-info/:storeName', getStoreInfo);

router.get('/api/tabs/:storeId', getTabsByCategory);

// We use middleware to check if the user is logged in
router.get('/user-profile', checkAuthenticated, async (req, res) => {
    const { userProfileController } = await import(`../controller/user-profile-controller.mjs`);
    userProfileController(req, res, { isHidden: true });
});

router.post('/user-profile', async (req, res) => {
    const { updateUserInfo } = await import(`../controller/user-profile-controller.mjs`);
    updateUserInfo(req, res);
});

router.post('/user-profile/change-password', async (req, res) => {
    const { changeUserPassword } = await import(`../controller/user-profile-controller.mjs`);
    changeUserPassword(req, res);
});

router.get('/store/:storeName/cart-modal', cartController);

router.get('/store/:storeName/checkout', async (req, res) => {
    const { checkoutController } = await import(`../controller/checkout-controller.mjs`);
    checkoutController(req, res, { isHidden: true });
});

router.post('/update-address', updateAddress);

router.get('/about', footerPagesController);
router.get('/privacy-policy', footerPagesController);
router.get('/terms-of-use', footerPagesController);

export default router;